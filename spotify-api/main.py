import requests

SPOTIFY_ACCESS_TOKEN = ''
SPOTIFY_GET_CURRENT_TRACK_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

def get_current_track(access_token):
    response = requests.get(
        SPOTIFY_GET_CURRENT_TRACK_URL,
        headers={
            'Authorization': f'Bearer {access_token}'
        }
    )
    resp_json = response.json()
    
    track_id = resp_json['item']['id']
    track_name = resp_json['item']['name']
    artists = resp_json['item']['artists']
    artists_name = ", ".join([artist['name'] for artist in artists])
    track_link = resp_json['item']['external_urls']['spotify']

    current_track_info = {
        "id": track_id,
        "name": track_name,
        "artist": artists_name,
        "link": track_link
    }

    return current_track_info

def main():
    current_track = get_current_track(SPOTIFY_ACCESS_TOKEN)
    print(current_track)

if __name__ == '__main__':
    main()


