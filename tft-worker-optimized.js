// Optimized TFT worker with single combined endpoint
// Define your Riot API key as an environment variable in Cloudflare
// RIOT_API_KEY = "your_riot_api_key"

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    var url = new URL(request.url);
    var route = url.pathname.replaceAll("/", "");
    
    switch (route) {
      case "hello":
        return await handleHello(request);
      case "get-tft-data":
        return await handleTFTData(request);
      default:
        return new Response(JSON.stringify({ error: "Unsupported request" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
    }
  } catch (error) {
    console.error("Global error handler:", error);
    return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      }
    });
  }
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

async function handleHello(request) {
  return new Response("Hello! Optimized TFT API with reduced requests.", {
    headers: getCorsHeaders()
  });
}

// Cache for reducing API calls
const cache = new Map();
const CACHE_DURATION = 300000; // 5 minutes

async function handleTFTData(request) {
  // Check if API key is available
  if (!RIOT_API_KEY) {
    return new Response(JSON.stringify({ error: "RIOT_API_KEY not configured" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      }
    });
  }

  var url = new URL(request.url);
  var gameName = url.searchParams.get("gameName");
  var tagLine = url.searchParams.get("tagLine");

  if (!gameName || !tagLine) {
    return new Response(JSON.stringify({ error: "Both gameName and tagLine are required." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      }
    });
  }

  // Check cache first
  const cacheKey = `tft-data-${gameName.toLowerCase()}#${tagLine.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Returning cached TFT data for ${cacheKey}`);
    return new Response(JSON.stringify(cached.data), {
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      }
    });
  }

  try {
    // STEP 1: Get PUUID (1 API call instead of 2)
    console.log(`Fetching PUUID for ${gameName}#${tagLine}`);
    const accountResponse = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );

    if (!accountResponse.ok) {
      if (accountResponse.status === 404) {
        return new Response(JSON.stringify({ error: "Player not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json", ...getCorsHeaders() }
        });
      } else if (accountResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a few seconds." }), {
          status: 429,
          headers: { "Content-Type": "application/json", ...getCorsHeaders() }
        });
      }
      throw new Error(`Failed to fetch account data: ${accountResponse.status}`);
    }

    const account = await accountResponse.json();
    const puuid = account.puuid;
    console.log(`✅ Got PUUID: ${puuid.substring(0, 20)}...`);

    // STEP 2: Get rank data (1 API call)
    console.log(`Fetching rank data...`);
    const rankResponse = await fetch(
      `https://na1.api.riotgames.com/tft/league/v1/by-puuid/${encodeURIComponent(puuid)}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );

    let rankData = [];
    if (rankResponse.ok) {
      rankData = await rankResponse.json();
      console.log(`✅ Got rank data: ${rankData[0]?.tier} ${rankData[0]?.rank}`);
    } else if (rankResponse.status === 404) {
      console.log(`Player is unranked`);
    } else {
      console.log(`Rank request failed: ${rankResponse.status}`);
    }

    // STEP 3: Get minimal match history (2 API calls instead of 12+)
    console.log(`Fetching match history...`);
    const matchResponse = await fetch(
      `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=10`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );

    let matchHistory = [];
    if (matchResponse.ok) {
      const matchIds = await matchResponse.json();
      console.log(`Got ${matchIds.length} match IDs, fetching details for all 10...`);
      
      // Get details for all 10 recent matches
      const matchDetails = await Promise.all(
        matchIds.slice(0, 10).map(async (matchId) => {
          try {
            const detailResponse = await fetch(
              `https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`,
              { headers: { "X-Riot-Token": RIOT_API_KEY } }
            );
            return detailResponse.ok ? await detailResponse.json() : null;
          } catch (error) {
            console.error(`Failed to fetch match ${matchId}:`, error);
            return null;
          }
        })
      );
      
      matchHistory = matchDetails.filter(m => m && m.info.queue_id === 1100);
      console.log(`✅ Got ${matchHistory.length} ranked matches`);
    }

    // Combine all data
    const combinedData = {
      matchHistory,
      rankData,
      playerInfo: { 
        gameName: account.gameName, 
        tagLine: account.tagLine, 
        puuid 
      }
    };

    // Cache the result
    cache.set(cacheKey, { data: combinedData, timestamp: Date.now() });
    console.log(`✅ Cached result for ${cacheKey}`);

    return new Response(JSON.stringify(combinedData), {
      headers: { "Content-Type": "application/json", ...getCorsHeaders() },
    });

  } catch (error) {
    console.error("TFT Data Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...getCorsHeaders() },
    });
  }
}