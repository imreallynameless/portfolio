// Cloudflare Worker for Strava API integration with daily scheduled calls
// Environment variables needed:
// STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  },
  
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleScheduledEvent(env));
  }
};

// Cache for reducing API calls
const cache = new Map();
const CACHE_DURATION = 3600000; // 1 hour cache

async function handleRequest(request, env) {
  try {
    const url = new URL(request.url);
    const route = url.pathname.replace(/^\/+|\/+$/g, '');
    
    switch (route) {
      case 'activities':
        return await handleGetActivities(request, env);
      case 'recent-activities':
        return await handleRecentActivities(request, env);
      case 'activities-by-month':
        return await handleActivitiesByMonth(request, env);
      case 'stats':
        return await handleGetStats(request, env);
      case 'callback':
        return await handleAuthCallback(request, env);
      case 'webhook':
        return await handleWebhook(request, env);
      case 'webhook-subscribe':
        return await handleWebhookSubscribe(request, env);
      case 'trigger-sync':
        return await handleTriggerSync(request, env);
      default:
        return new Response(JSON.stringify({ error: 'Unsupported request' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders()
          }
        });
    }
  } catch (error) {
    console.error('Global error handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  }
}


// Weekly backup sync (in case webhooks miss anything)
async function handleScheduledEvent(env) {
  console.log(`Weekly backup sync triggered at: ${new Date().toISOString()}`);
  
  try {
    // Fetch fresh access token
    const accessToken = await getValidAccessToken(env);
    
    // Fetch activities from the last 2 years for comprehensive data
    const twoYearsAgo = Math.floor((Date.now() - (2 * 365 * 24 * 60 * 60 * 1000)) / 1000);
    const activities = await fetchActivitiesSince(accessToken, twoYearsAgo);
    
    // Store in KV storage
    await env.STRAVA_DATA.put('backup_activities', JSON.stringify({
      activities,
      lastBackupSync: new Date().toISOString()
    }));
    
    // Organize by month and store
    await organizeAndStoreActivitiesByMonth(activities, env);
    
    console.log(`Backup sync: fetched and stored ${activities.length} activities`);
  } catch (error) {
    console.error('Backup sync error:', error);
  }
}

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function getValidAccessToken(env) {
  // Check if we have a cached valid token
  const cachedToken = await env.STRAVA_DATA.get('access_token');
  if (cachedToken) {
    const tokenData = JSON.parse(cachedToken);
    if (Date.now() < tokenData.expires_at * 1000) {
      return tokenData.access_token;
    }
  }
  
  // Refresh the token
  const refreshResponse = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      refresh_token: env.STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });
  
  if (!refreshResponse.ok) {
    throw new Error(`Failed to refresh token: ${refreshResponse.status}`);
  }
  
  const tokenData = await refreshResponse.json();
  
  // Store the new token
  await env.STRAVA_DATA.put('access_token', JSON.stringify(tokenData));
  
  return tokenData.access_token;
}

async function fetchActivities(accessToken, days = 30) {
  const since = Math.floor((Date.now() - (days * 24 * 60 * 60 * 1000)) / 1000);
  return await fetchActivitiesSince(accessToken, since);
}

async function fetchActivitiesSince(accessToken, sinceTimestamp) {
  const allActivities = [];
  let page = 1;
  const perPage = 200; // Maximum allowed by Strava API
  
  while (true) {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${sinceTimestamp}&per_page=${perPage}&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }
    
    const activities = await response.json();
    
    if (activities.length === 0) {
      break; // No more activities
    }
    
    allActivities.push(...activities);
    
    // If we got less than the max per page, we've reached the end
    if (activities.length < perPage) {
      break;
    }
    
    page++;
    
    // Add a small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return allActivities;
}

async function handleGetActivities(request, env) {
  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get('days')) || 30;
  
  // Check cache first
  const cacheKey = `activities-${days}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return new Response(JSON.stringify(cached.data), {
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  }
  
  try {
    const accessToken = await getValidAccessToken(env);
    const activities = await fetchActivities(accessToken, days);
    
    // Process activities data
    const processedActivities = activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      start_date: activity.start_date,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories
    }));
    
    // Cache the result
    cache.set(cacheKey, {
      data: processedActivities,
      timestamp: Date.now()
    });
    
    return new Response(JSON.stringify(processedActivities), {
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  }
}


async function handleRecentActivities(request, env) {
  try {
    // Try to get webhook-updated activities first (real-time)
    const recentData = await env.STRAVA_DATA.get('recent_activities');
    if (recentData) {
      const data = JSON.parse(recentData);
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders()
        }
      });
    }
    
    // Fallback to backup sync data
    const backupData = await env.STRAVA_DATA.get('backup_activities');
    if (backupData) {
      const data = JSON.parse(backupData);
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders()
        }
      });
    }
    
    // Final fallback to live fetch
    return await handleGetActivities(request, env);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  }
}


// Organize activities by month and store in KV
async function organizeAndStoreActivitiesByMonth(activities, env) {
  const activitiesByMonth = {};
  
  activities.forEach(activity => {
    const activityDate = new Date(activity.start_date);
    const monthKey = `${activityDate.getFullYear()}-${String(activityDate.getMonth() + 1).padStart(2, '0')}`;
    
    if (!activitiesByMonth[monthKey]) {
      activitiesByMonth[monthKey] = [];
    }
    
    activitiesByMonth[monthKey].push({
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      start_date: activity.start_date,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories
    });
  });
  
  // Store each month separately in KV for efficient retrieval
  for (const [monthKey, monthActivities] of Object.entries(activitiesByMonth)) {
    await env.STRAVA_DATA.put(`activities_${monthKey}`, JSON.stringify({
      month: monthKey,
      activities: monthActivities,
      count: monthActivities.length,
      lastUpdated: new Date().toISOString()
    }));
  }
  
  // Store index of available months
  const monthsIndex = Object.keys(activitiesByMonth).sort().reverse(); // Most recent first
  await env.STRAVA_DATA.put('months_index', JSON.stringify({
    months: monthsIndex,
    lastUpdated: new Date().toISOString()
  }));
}

// Handle activities organized by month
async function handleActivitiesByMonth(request, env) {
  try {
    const url = new URL(request.url);
    const specificMonth = url.searchParams.get('month'); // Format: 2024-01
    
    if (specificMonth) {
      // Return activities for a specific month
      const monthData = await env.STRAVA_DATA.get(`activities_${specificMonth}`);
      if (monthData) {
        return new Response(monthData, {
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders()
          }
        });
      } else {
        return new Response(JSON.stringify({ error: 'No activities found for this month' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders()
          }
        });
      }
    }
    
    // Return index of all available months with summary
    const monthsIndexData = await env.STRAVA_DATA.get('months_index');
    if (!monthsIndexData) {
      return new Response(JSON.stringify({ error: 'No monthly data available yet' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders()
        }
      });
    }
    
    const monthsIndex = JSON.parse(monthsIndexData);
    const monthsSummary = [];
    
    // Get summary for each month
    for (const month of monthsIndex.months) {
      const monthData = await env.STRAVA_DATA.get(`activities_${month}`);
      if (monthData) {
        const data = JSON.parse(monthData);
        const totalDistance = data.activities.reduce((sum, act) => sum + (act.distance || 0), 0);
        const totalTime = data.activities.reduce((sum, act) => sum + (act.moving_time || 0), 0);
        
        monthsSummary.push({
          month: month,
          year: month.split('-')[0],
          monthName: new Date(month + '-01').toLocaleString('default', { month: 'long' }),
          activityCount: data.count,
          totalDistance: totalDistance,
          totalTime: totalTime,
          lastUpdated: data.lastUpdated
        });
      }
    }
    
    return new Response(JSON.stringify({
      months: monthsSummary,
      totalMonths: monthsSummary.length,
      lastUpdated: monthsIndex.lastUpdated
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  } catch (error) {
    console.error('Error fetching monthly activities:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  }
}


async function handleGetStats(request, env) {
  try {
    const activities = await handleGetActivities(request, env);
    const activitiesData = await activities.json();
    
    if (activitiesData.error) {
      throw new Error(activitiesData.error);
    }
    
    // Calculate stats
    const stats = {
      totalActivities: activitiesData.length,
      totalDistance: activitiesData.reduce((sum, activity) => sum + (activity.distance || 0), 0),
      totalTime: activitiesData.reduce((sum, activity) => sum + (activity.moving_time || 0), 0),
      totalElevation: activitiesData.reduce((sum, activity) => sum + (activity.total_elevation_gain || 0), 0),
      averageSpeed: activitiesData.length > 0 ? 
        activitiesData.reduce((sum, activity) => sum + (activity.average_speed || 0), 0) / activitiesData.length : 0,
      activityTypes: [...new Set(activitiesData.map(activity => activity.type))],
      lastActivity: activitiesData.length > 0 ? activitiesData[0].start_date : null
    };
    
    return new Response(JSON.stringify(stats), {
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  } catch (error) {
    console.error('Error calculating stats:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders()
      }
    });
  }
}


async function handleAuthCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  
  if (error) {
    return new Response(`Authorization failed: ${error}`, {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
        ...getCorsHeaders()
      }
    });
  }
  
  if (!code) {
    return new Response('Missing authorization code', {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
        ...getCorsHeaders()
      }
    });
  }
  
  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.STRAVA_CLIENT_ID,
        client_secret: env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
      })
    });
    
    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.status}`);
    }
    
    const tokenData = await tokenResponse.json();
    
    // Store the refresh token (you'll use this for the scheduled calls)
    await env.STRAVA_DATA.put('refresh_token', tokenData.refresh_token);
    await env.STRAVA_DATA.put('access_token', JSON.stringify(tokenData));
    
    return new Response(`
      <html>
        <body>
          <h2>✅ Strava Authorization Successful!</h2>
          <p>Your refresh token has been stored securely.</p>
          <p>Refresh Token: <code>${tokenData.refresh_token}</code></p>
          <p><strong>Save this refresh token</strong> and add it to your worker's environment variables as STRAVA_REFRESH_TOKEN</p>
          <p>You can now close this window.</p>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
        ...getCorsHeaders()
      }
    });
  } catch (error) {
    console.error('Callback error:', error);
    return new Response(`Error during authorization: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
        ...getCorsHeaders()
      }
    });
  }
}


// Webhook handler for real-time Strava events
async function handleWebhook(request, env) {
  if (request.method === 'GET') {
    // Webhook verification (required by Strava)
    const url = new URL(request.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');
    
    if (mode === 'subscribe' && token === env.WEBHOOK_VERIFY_TOKEN) {
      console.log('Webhook verified');
      return new Response(JSON.stringify({ 'hub.challenge': challenge }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Forbidden', { status: 403 });
  }
  
  if (request.method === 'POST') {
    // Handle incoming webhook events
    try {
      const event = await request.json();
      console.log('Webhook event received:', event);
      
      // Only process activity events
      if (event.object_type === 'activity') {
        await processActivityEvent(event, env);
      }
      
      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Webhook processing error:', error);
      return new Response('Error processing webhook', { status: 500 });
    }
  }
  
  return new Response('Method not allowed', { status: 405 });
}

// Process activity webhook events
async function processActivityEvent(event, env) {
  const { aspect_type, object_id } = event;
  
  try {
    if (aspect_type === 'create' || aspect_type === 'update') {
      // Fetch the activity details
      const accessToken = await getValidAccessToken(env);
      const activityResponse = await fetch(`https://www.strava.com/api/v3/activities/${object_id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (activityResponse.ok) {
        const activity = await activityResponse.json();
        
        // Store individual activity
        await env.STRAVA_DATA.put(`activity_${object_id}`, JSON.stringify({
          ...activity,
          webhook_updated: new Date().toISOString()
        }));
        
        // Update recent activities list
        await updateRecentActivitiesList(activity, aspect_type, env);
        
        // Update monthly data
        await updateMonthlyData(activity, aspect_type, env);
        
        console.log(`Activity ${aspect_type}: ${activity.name} (${object_id})`);
      }
    } else if (aspect_type === 'delete') {
      // Remove deleted activity
      await env.STRAVA_DATA.delete(`activity_${object_id}`);
      await removeFromRecentActivitiesList(object_id, env);
      
      console.log(`Activity deleted: ${object_id}`);
    }
  } catch (error) {
    console.error('Error processing activity event:', error);
  }
}

// Update the recent activities list with new/updated activity
async function updateRecentActivitiesList(activity, aspect_type, env) {
  try {
    // Get current recent activities
    const storedData = await env.STRAVA_DATA.get('recent_activities');
    let recentActivities = storedData ? JSON.parse(storedData) : { activities: [] };
    
    // Remove existing activity if it's an update
    recentActivities.activities = recentActivities.activities.filter(a => a.id !== activity.id);
    
    // Add the new/updated activity at the beginning
    recentActivities.activities.unshift({
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      start_date: activity.start_date,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories
    });
    
    // Keep only the 50 most recent activities
    recentActivities.activities = recentActivities.activities.slice(0, 50);
    recentActivities.lastUpdated = new Date().toISOString();
    recentActivities.updateType = 'webhook';
    
    // Store updated list
    await env.STRAVA_DATA.put('recent_activities', JSON.stringify(recentActivities));
  } catch (error) {
    console.error('Error updating recent activities list:', error);
  }
}

// Remove activity from recent activities list
async function removeFromRecentActivitiesList(activityId, env) {
  try {
    const storedData = await env.STRAVA_DATA.get('recent_activities');
    if (storedData) {
      const recentActivities = JSON.parse(storedData);
      recentActivities.activities = recentActivities.activities.filter(a => a.id !== parseInt(activityId));
      recentActivities.lastUpdated = new Date().toISOString();
      recentActivities.updateType = 'webhook_delete';
      
      await env.STRAVA_DATA.put('recent_activities', JSON.stringify(recentActivities));
    }
  } catch (error) {
    console.error('Error removing activity from recent list:', error);
  }
}

// Update monthly data when activities are added/updated via webhook
async function updateMonthlyData(activity, aspect_type, env) {
  try {
    const activityDate = new Date(activity.start_date);
    const monthKey = `${activityDate.getFullYear()}-${String(activityDate.getMonth() + 1).padStart(2, '0')}`;
    
    // Get existing month data
    const monthData = await env.STRAVA_DATA.get(`activities_${monthKey}`);
    let monthActivities = monthData ? JSON.parse(monthData) : { month: monthKey, activities: [], count: 0 };
    
    // Remove existing activity if it's an update
    monthActivities.activities = monthActivities.activities.filter(a => a.id !== activity.id);
    
    // Add the new/updated activity
    monthActivities.activities.unshift({
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      start_date: activity.start_date,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories
    });
    
    // Sort by date (most recent first)
    monthActivities.activities.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    
    monthActivities.count = monthActivities.activities.length;
    monthActivities.lastUpdated = new Date().toISOString();
    
    // Store updated month data
    await env.STRAVA_DATA.put(`activities_${monthKey}`, JSON.stringify(monthActivities));
    
    // Update months index
    const monthsIndexData = await env.STRAVA_DATA.get('months_index');
    let monthsIndex = monthsIndexData ? JSON.parse(monthsIndexData) : { months: [] };
    
    if (!monthsIndex.months.includes(monthKey)) {
      monthsIndex.months.push(monthKey);
      monthsIndex.months.sort().reverse(); // Most recent first
      monthsIndex.lastUpdated = new Date().toISOString();
      
      await env.STRAVA_DATA.put('months_index', JSON.stringify(monthsIndex));
    }
  } catch (error) {
    console.error('Error updating monthly data:', error);
  }
}

// Helper function to subscribe to webhooks (call this once to set up)
async function handleWebhookSubscribe(request, env) {
  try {
    const subscribeResponse = await fetch('https://www.strava.com/api/v3/push_subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.STRAVA_CLIENT_ID,
        client_secret: env.STRAVA_CLIENT_SECRET,
        callback_url: `${new URL(request.url).origin}/webhook`,
        verify_token: env.WEBHOOK_VERIFY_TOKEN
      })
    });
    
    const result = await subscribeResponse.json();
    
    if (subscribeResponse.ok) {
      return new Response(JSON.stringify({ 
        success: true, 
        subscription: result 
      }), {
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders() }
      });
    } else {
      return new Response(JSON.stringify({ 
        error: 'Failed to subscribe to webhooks', 
        details: result 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders() }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Error subscribing to webhooks', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders() }
    });
  }
}

// Manual trigger for sync (useful for immediate data population)
async function handleTriggerSync(request, env) {
  try {
    // Run the same logic as the scheduled event
    await handleScheduledEvent(env);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Data sync triggered successfully' 
    }), {
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders() }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Error triggering sync', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders() }
    });
  }
}

