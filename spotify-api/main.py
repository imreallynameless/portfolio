from flask import Flask, jsonify
import requests
import os

app = Flask(__name__)

# Get the Spotify access token (from an environment variable or hard-code it for testing)
SPOTIFY_ACCESS_TOKEN = 'BQA9ktweTOfQ7U6PXI-qMDCZ5MRHLoqp2h1P2NYQR858XbTUj1mcYKmisGXqHHGQvEfb-SzVRfJzWEDS9n4PgJpQnc1ONIQyU9fctUraTYRdmpjZss0'
SPOTIFY_GET_CURRENT_TRACK_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

def get_current_track():
    response = requests.get(
        SPOTIFY_GET_CURRENT_TRACK_URL,
        headers={
            'Authorization': f'Bearer {SPOTIFY_ACCESS_TOKEN}'
        }
    )
    if response.status_code == 200:
        resp_json = response.json()
        track_id = resp_json['item']['id']
        track_name = resp_json['item']['name']
        artists = resp_json['item']['artists']
        artists_name = ", ".join([artist['name'] for artist in artists])
        track_link = resp_json['item']['external_urls']['spotify']

        return {
            "id": track_id,
            "name": track_name,
            "artist": artists_name,
            "link": track_link
        }
    else:
        return {"error": "Unable to fetch the current track."}

@app.route('/current-track', methods=['GET'])
def current_track():
    return jsonify(get_current_track())

if __name__ == '__main__':
    app.run(debug=True, port=5000)


