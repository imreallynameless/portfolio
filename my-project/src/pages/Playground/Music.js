import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlayNav from '../../Components/playNav';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  margin: auto;
  padding: 50px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 5rem;
  letter-spacing: 0.4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CurrentTrackContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  min-height: 400px; /* Reserve space to prevent layout shift */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrackInfo = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const AlbumArt = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  /* Prevent layout shift during loading */
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #f0f0f0; /* Placeholder background */

  @media (max-width: 768px) {
    width: 250px;
    height: 250px; /* Maintain fixed dimensions on mobile too */
  }
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// Skeleton loader to prevent layout shifts
const SkeletonLoader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SkeletonText = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  height: 20px;
  width: ${props => props.width || '200px'};
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 300px;
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;



function Music() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Defer the API call by a small amount to allow the page to render first
    const timeoutId = setTimeout(() => {
      fetch('https://spotify.leiwuhoo.workers.dev/get-now-playing')
        .then(response => response.json())
        .then(data => {
          if (data.ERROR) {
            setError(data.ERROR);
            setNowPlaying(lastPlayed); // Set nowPlaying to lastPlayed on error
          } else {
            setNowPlaying((prevNowPlaying) => {
              // Update lastPlayed only if nowPlaying changes
              if (prevNowPlaying && prevNowPlaying.item.id !== data.item.id) {
                setLastPlayed(prevNowPlaying);
              }
              return data;
            });
            setError(null);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching now playing data:', error);
          setError('Error fetching now playing data');
          setNowPlaying(lastPlayed); // Set nowPlaying to lastPlayed on fetch failure
          setLoading(false);
        });
    }, 100); // Small delay to defer loading

    return () => clearTimeout(timeoutId);
  }, [lastPlayed]); // Include lastPlayed as a dependency

  return (
    <>
      <PlayNav />
      <Layout>
        <HeadingContainer>
          <Heading>stalk my music</Heading>
        </HeadingContainer>
        
        <CurrentTrackContainer>
        {loading ? (
          <SkeletonLoader>
            <SkeletonText width="300px" />
            <SkeletonText width="250px" />
            <SkeletonText width="200px" />
            <SkeletonText width="180px" />
            <SkeletonImage />
          </SkeletonLoader>
        ) : nowPlaying ? (
          <TrackDetails>
            <TrackInfo>{error ? "Last Played (Due to Error)" : "currently listening to"}</TrackInfo>
            <TrackInfo>{nowPlaying.item.name}</TrackInfo>
            <TrackInfo>by {nowPlaying.item.artists.map(artist => artist.name).join(', ')}</TrackInfo>
            <TrackInfo>in  {nowPlaying.item.album.name}</TrackInfo>
            <AlbumArt src={nowPlaying.item.album.images[0].url} alt={nowPlaying.item.album.name} />
          </TrackDetails>
        ) : (
          <p>No track is currently playing and no last played track available.</p>
        )} 
        </CurrentTrackContainer>

        <Heading> current mix</Heading>
        <iframe
          style={{ borderRadius: "12px", gridColumn: "span 3" }}
          src="https://open.spotify.com/embed/playlist/71gcONGYJKPYQiGRGYr6Qt?utm_source=generator&theme=0"
          width="100%"
          height="352px"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist"
        />
      </Layout>
    </>
  );
}



export default Music;