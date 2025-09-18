# Strava API Daily Integration Setup

This guide explains how to set up daily Strava API calls for your activities using multiple approaches.

## Option 1: Cloudflare Workers + Scheduled Events (Recommended)

### Prerequisites

1. **Strava API Application**
   - Go to https://www.strava.com/settings/api
   - Create a new application
   - Note down your `Client ID` and `Client Secret`

2. **Get Initial Authorization**
   
   **For Cloudflare Workers deployment:**
   - Your callback URL will be: `https://strava.leiwuhoo.workers.dev/callback`
   - Or if using custom domain: `https://api.laywu.ca/strava/callback`
   
   **Authorization steps:**
   - Deploy the worker first (see deployment steps below)
   - Use the following URL to authorize your app (replace YOUR_CLIENT_ID and YOUR_CALLBACK_URL):
   ```
   https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://strava.leiwuhoo.workers.dev/callback&approval_prompt=force&scope=activity:read_all
   ```
   - The callback handler will automatically exchange the code for tokens and display your refresh token
   - Save the `refresh_token` from the callback page

### Cloudflare Setup

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Deploy the Worker**
   ```bash
   cd /path/to/your/project
   wrangler login
   wrangler publish
   ```

3. **Set Environment Variables**
   ```bash
   wrangler secret put STRAVA_CLIENT_ID
   wrangler secret put STRAVA_CLIENT_SECRET
   wrangler secret put STRAVA_REFRESH_TOKEN
   ```

4. **Create KV Namespace**
   ```bash
   wrangler kv:namespace create "STRAVA_DATA"
   wrangler kv:namespace create "STRAVA_DATA" --preview
   ```
   Update the namespace IDs in `wrangler.toml`

5. **Configure Scheduled Events**
   The worker is configured to run daily at 6 AM UTC. You can modify the cron schedule in `wrangler.toml`:
   ```toml
   [triggers]
   crons = ["0 6 * * *"]  # Daily at 6 AM UTC
   ```

### API Endpoints

Once deployed, your worker will provide these endpoints:

- `GET /activities?days=30` - Get activities from last N days
- `GET /recent-activities` - Get cached daily activities
- `GET /stats` - Get activity statistics

## Option 2: Firebase Functions + Cloud Scheduler

### Setup Firebase Functions

1. **Initialize Firebase Functions**
   ```bash
   cd my-project/functions
   npm install firebase-functions firebase-admin axios
   ```

2. **Create Strava Function**
   ```javascript
   // functions/strava.js
   const functions = require('firebase-functions');
   const admin = require('firebase-admin');
   const axios = require('axios');

   exports.fetchStravaActivities = functions.pubsub
     .schedule('0 6 * * *') // Daily at 6 AM UTC
     .timeZone('UTC')
     .onRun(async (context) => {
       try {
         // Refresh token logic
         const refreshToken = functions.config().strava.refresh_token;
         const clientId = functions.config().strava.client_id;
         const clientSecret = functions.config().strava.client_secret;
         
         // Get new access token
         const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
           client_id: clientId,
           client_secret: clientSecret,
           refresh_token: refreshToken,
           grant_type: 'refresh_token'
         });
         
         const accessToken = tokenResponse.data.access_token;
         
         // Fetch activities
         const activitiesResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
           headers: {
             'Authorization': `Bearer ${accessToken}`
           },
           params: {
             per_page: 200,
             after: Math.floor((Date.now() - (7 * 24 * 60 * 60 * 1000)) / 1000)
           }
         });
         
         // Store in Firestore
         const db = admin.firestore();
         await db.collection('strava').doc('activities').set({
           activities: activitiesResponse.data,
           lastUpdated: admin.firestore.FieldValue.serverTimestamp()
         });
         
         console.log(`Fetched ${activitiesResponse.data.length} activities`);
       } catch (error) {
         console.error('Error fetching Strava activities:', error);
       }
     });
   ```

3. **Set Configuration**
   ```bash
   firebase functions:config:set strava.client_id="YOUR_CLIENT_ID"
   firebase functions:config:set strava.client_secret="YOUR_CLIENT_SECRET"
   firebase functions:config:set strava.refresh_token="YOUR_REFRESH_TOKEN"
   ```

4. **Deploy**
   ```bash
   firebase deploy --only functions
   ```

## Option 3: GitHub Actions (Free Alternative)

### Create GitHub Action

1. **Create Workflow File**
   ```yaml
   # .github/workflows/strava-sync.yml
   name: Sync Strava Activities
   
   on:
     schedule:
       - cron: '0 6 * * *'  # Daily at 6 AM UTC
     workflow_dispatch:  # Allow manual trigger
   
   jobs:
     sync-strava:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'
             
         - name: Install dependencies
           run: npm install axios
           
         - name: Sync Strava Activities
           env:
             STRAVA_CLIENT_ID: ${{ secrets.STRAVA_CLIENT_ID }}
             STRAVA_CLIENT_SECRET: ${{ secrets.STRAVA_CLIENT_SECRET }}
             STRAVA_REFRESH_TOKEN: ${{ secrets.STRAVA_REFRESH_TOKEN }}
           run: node scripts/sync-strava.js
           
         - name: Commit and push if changed
           run: |
             git config --global user.email "action@github.com"
             git config --global user.name "GitHub Action"
             git add -A
             git diff --staged --quiet || (git commit -m "Update Strava activities data" && git push)
   ```

2. **Create Sync Script**
   ```javascript
   // scripts/sync-strava.js
   const axios = require('axios');
   const fs = require('fs');
   const path = require('path');
   
   async function syncStravaActivities() {
     try {
       // Get access token
       const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
         client_id: process.env.STRAVA_CLIENT_ID,
         client_secret: process.env.STRAVA_CLIENT_SECRET,
         refresh_token: process.env.STRAVA_REFRESH_TOKEN,
         grant_type: 'refresh_token'
       });
       
       const accessToken = tokenResponse.data.access_token;
       
       // Fetch activities
       const activitiesResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
         headers: {
           'Authorization': `Bearer ${accessToken}`
         },
         params: {
           per_page: 200,
           after: Math.floor((Date.now() - (30 * 24 * 60 * 60 * 1000)) / 1000)
         }
       });
       
       // Save to public directory
       const outputPath = path.join(__dirname, '../../my-project/public/strava-data.json');
       fs.writeFileSync(outputPath, JSON.stringify({
         activities: activitiesResponse.data,
         lastUpdated: new Date().toISOString()
       }, null, 2));
       
       console.log(`Successfully synced ${activitiesResponse.data.length} activities`);
     } catch (error) {
       console.error('Error syncing Strava activities:', error);
       process.exit(1);
     }
   }
   
   syncStravaActivities();
   ```

3. **Add Secrets**
   - Go to your GitHub repo → Settings → Secrets
   - Add `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN`

## Rate Limits & Best Practices

### Strava API Limits
- 100 requests per 15 minutes
- 1,000 requests per day
- Use caching to minimize API calls

### Recommendations
1. **Cache data** for at least 1 hour between requests
2. **Handle errors gracefully** and implement retry logic
3. **Store refresh tokens securely** and refresh access tokens as needed
4. **Monitor usage** to stay within rate limits
5. **Use webhooks** for real-time updates if needed

## Integration with Your React App

Update your Playground component to include the Strava route:

```javascript
// In your routing component
import Strava from './Playground/Strava';

// Add route
<Route path="/playground/strava" element={<Strava />} />
```

## Webhook Setup (Optional)

For real-time updates, you can set up Strava webhooks:

1. **Create webhook endpoint** in your worker or Firebase function
2. **Subscribe to athlete events**:
   ```bash
   curl -X POST https://www.strava.com/api/v3/push_subscriptions \
     -F client_id=YOUR_CLIENT_ID \
     -F client_secret=YOUR_CLIENT_SECRET \
     -F callback_url=https://your-worker.your-subdomain.workers.dev/webhook \
     -F verify_token=YOUR_VERIFY_TOKEN
   ```

The Cloudflare Workers approach is recommended as it's most consistent with your existing architecture and provides the best performance and reliability.
