import os
from dotenv import load_dotenv
from fastapi import FastAPI
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import CacheHandler

# Load environment variables
load_dotenv()

app = FastAPI()

client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')

if not client_id or not client_secret:
    raise ValueError("Missing required environment variables: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET")
redirect_uri = 'http://localhost:5000/callback'
scope = 'user-read-playback-state user-read-currently-playing'

cache_handler = CacheHandler()
sp_oauth = SpotifyOAuth(client_id=client_id, client_secret=client_secret,
                         redirect_uri=redirect_uri, scope=scope, cache_handler=cache_handler)

sp = Spotify(auth_manager=sp_oauth)


@app.get("/current_track")
async def get_current_track():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return {"status": "Token expired or invalid."}

    playback = sp.current_playback()
    if playback:
        return {
            "track": playback['item']['name'],
            "artist": playback['item']['artists'][0]['name']
        }
    return {"status": "No track is currently playing."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5000)
