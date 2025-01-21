import os

from flask import Flask, session, redirect, url_for, request, jsonify
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.config['SECRET_KEY'] = os.urandom(64)

client_id = '[REDACTED]'
client_secret = '[REDACTED]'
redirect_uri = 'http://localhost:5000/callback'
scope = 'user-read-playback-state user-read-currently-playing'



cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope=scope,
    cache_handler=cache_handler,
    open_browser=True,
    show_dialog=True
)

def get_valid_token():
    token_info = cache_handler.get_cached_token()
    if not sp_oauth.validate_token(token_info):
        # Refresh the token if it's expired
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
        cache_handler.save_token_to_cache(token_info)
    return token_info['access_token']


sp = Spotify(auth_manager=sp_oauth)

@app.route('/')
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return redirect(url_for('currently_playing'))

@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    if token_info is None:
        return "Failed to retrieve access token.", 400
    return redirect(url_for('currently_playing'))


@app.route('/currently_playing')
def currently_playing():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    
    playback = sp.current_playback()
    if playback is None:
        return "No track is currently playing."
    return f"Currently playing: {playback['item']['name']} by {playback['item']['artists'][0]['name']}"

@app.route('/api/current-track')
def get_current_track():
    try:
        # Ensure a valid token is available
        sp.auth_manager.cache_handler.save_token_to_cache({
            **cache_handler.get_cached_token(),
            "access_token": get_valid_token()
        })
        
        playback = sp.current_playback()
        if playback is None or playback['item'] is None:
            return jsonify({"isPlaying": False, "track": None})

        # Return track details
        return jsonify({
            "isPlaying": True,
            "track": {
                "name": playback['item']['name'],
                "artist": playback['item']['artists'][0]['name'],
                "album": playback['item']['album']['name'],
                "albumArt": playback['item']['album']['images'][0]['url'] if playback['item']['album']['images'] else None,
                "spotifyUrl": playback['item']['external_urls']['spotify']
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
