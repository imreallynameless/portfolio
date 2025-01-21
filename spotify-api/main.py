import os

from flask import Flask, session, redirect, url_for, request
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

app = Flask(__name__)

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
    show_dialog=True
)

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




if __name__ == "__main__":
    app.run(debug=True)
