// Define your Riot API key as an environment variable in Cloudflare
// RIOT_API_KEY = "your_riot_api_key"

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    var url = new URL(request.url);

    // Simple routing
    var route = url.pathname.replaceAll("/", "");
    
    switch (route) {
      case "hello":
        return await handleHello(request);
      case "get-tft-match-history":
        return await handleTFTMatchHistory(request);
      case "get-summoner-id":
        return await handleSummonerId(request);
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

// Helper function for consistent CORS headers
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

async function handleHello(request) {
  return new Response("Hello!, This is my first middleware thingy.", {
    headers: getCorsHeaders()
  });
}

async function handleTFTMatchHistory(request) {
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

  // Extract the game name and tag line from the query parameters
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

  try {
    // Step 1: Get the PUUID using the game name and tag line
    const accountData = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    if (!accountData.ok) {
      if (accountData.status === 404) {
        return new Response(JSON.stringify({ error: "Player not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      }
      throw new Error(
        `Failed to fetch account data: ${accountData.status} - ${accountData.statusText}`
      );
    }

    const account = await accountData.json();
    const puuid = account.puuid;

    // Step 2: Get the match history (last 20 matches to ensure we get 10 ranked games)
    const matchHistory = await fetch(
      `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=20`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    if (!matchHistory.ok) {
      throw new Error(
        `Failed to fetch match history: ${matchHistory.status} - ${matchHistory.statusText}`
      );
    }

    const matchIds = await matchHistory.json();

    // Step 3: Fetch details for each match
    const matchDetailsPromises = matchIds.map((matchId) =>
      fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`, {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }).then((response) => {
        if (!response.ok) {
          console.error(`Failed to fetch match ${matchId}: ${response.status}`);
          return null; // Return null for failed matches instead of throwing
        }
        return response.json();
      })
    );

    const allMatchDetails = await Promise.all(matchDetailsPromises);
    
    // Filter out null results and only include ranked matches
    // 1100 is ranked TFT (should work for current set)
    const rankedMatches = allMatchDetails
      .filter(match => match !== null && match.info.queue_id === 1100)
      .slice(0, 10); // Take only the first 10 ranked matches

    // Return the match data as a JSON response
    return new Response(JSON.stringify(rankedMatches, null, 2), {
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders(),
      },
    });
  } catch (error) {
    console.error("TFT Match History Error:", error);
    // Handle errors and return a user-friendly message
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      },
    });
  }
}

// Simple in-memory cache (resets when worker restarts)
const cache = new Map();
const puuidCache = new Map(); // Separate cache for PUUIDs (they never change)
const CACHE_DURATION = 300000; // 5 minute cache for rank data
const PUUID_CACHE_DURATION = 86400000; // 24 hour cache for PUUIDs

async function handleSummonerId(request) {
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

  // Extract the gameName and tagLine from the query parameters
  var url = new URL(request.url);
  var gameName = url.searchParams.get("gameName");
  var tagLine = url.searchParams.get("tagLine");

  if (!gameName || !tagLine) {
    return new Response(JSON.stringify({ error: "gameName and tagLine are required." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      }
    });
  }

  // Check cache first
  const cacheKey = `${gameName.toLowerCase()}#${tagLine.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Returning cached data for ${cacheKey}`);
    return new Response(JSON.stringify(cached.data), {
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      }
    });
  }

  try {
    // Step 1: Fetch the PUUID using the gameName and tagLine
    console.log(`Fetching PUUID for ${gameName}#${tagLine}`);
    const accountResponse = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );

    if (!accountResponse.ok) {
      if (accountResponse.status === 404) {
        return new Response(JSON.stringify({ error: "Player not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      } else if (accountResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a few seconds." }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      }
      throw new Error(
        `Failed to fetch account data: ${accountResponse.status} - ${accountResponse.statusText}`
      );
    }

    const accountData = await accountResponse.json();
    const puuid = accountData.puuid;

    // Validate PUUID format (should be 78 characters)
    if (!puuid || puuid.length !== 78) {
      console.error(`Invalid PUUID received: ${puuid} (length: ${puuid?.length})`);
      return new Response(JSON.stringify({ error: "Invalid player data received from Riot API" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...getCorsHeaders()
        }
      });
    }

    console.log(`Successfully fetched PUUID: ${puuid}`);

    // Add a longer delay to avoid hitting rate limits (temporary API keys are strict)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Try to get league data directly using PUUID on NA1 platform
    console.log(`Fetching TFT league data for PUUID: ${puuid}`);
    
    try {
      console.log(`Trying TFT league endpoint on NA1 platform`);
      const leagueResponse = await fetch(
        `https://na1.api.riotgames.com/tft/league/v1/by-puuid/${encodeURIComponent(puuid)}`,
        {
          headers: {
            "X-Riot-Token": RIOT_API_KEY,
          },
        }
      );

      if (leagueResponse.ok) {
        const leagueData = await leagueResponse.json();
        console.log(`Successfully fetched league data from NA1:`, leagueData);
        
        // Cache the successful result
        cache.set(cacheKey, {
          data: leagueData,
          timestamp: Date.now()
        });
        
        return new Response(JSON.stringify(leagueData), {
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      } else if (leagueResponse.status === 404) {
        // Player is unranked
        console.log("Player is unranked (404 from NA1)");
        
        // Cache the unranked result
        cache.set(cacheKey, {
          data: [],
          timestamp: Date.now()
        });
        
        return new Response(JSON.stringify([]), {
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      } else if (leagueResponse.status === 429) {
        // Rate limited
        console.error("Rate limited by Riot API");
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a few seconds." }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      } else if (leagueResponse.status >= 500) {
        // Server error
        console.error(`Server error from NA1: ${leagueResponse.status}`);
        return new Response(JSON.stringify({ error: "Server error fetching rank data" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...getCorsHeaders()
          }
        });
      } else {
        throw new Error(
          `Failed to fetch league data from NA1: ${leagueResponse.status} - ${leagueResponse.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching league data from NA1:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...getCorsHeaders()
        }
      });
    }

  } catch (error) {
    console.error("Summoner ID Error:", error);
    // Handle errors and return a user-friendly message
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...getCorsHeaders()
      },
    });
  }
}