import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyItem = {
  id: string;
  name: string;
  album: {
    name: string;
    images: SpotifyImage[];
  };
  artists: SpotifyArtist[];
};

type SpotifyResponse = {
  item: SpotifyItem;
};

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
  min-height: 400px;
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
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SkeletonLoader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const createGradientAnimation = () => `
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonText = styled.div<{ width?: string }>`
  ${createGradientAnimation()}
  border-radius: 4px;
  height: 20px;
  width: ${({ width }) => width || "200px"};
`;

const SkeletonImage = styled.div`
  ${createGradientAnimation()}
  width: 300px;
  height: 300px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const Music: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<SpotifyResponse | null>(null);
  const [lastPlayed, setLastPlayed] = useState<SpotifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetch("https://spotify.leiwuhoo.workers.dev/get-now-playing")
        .then((response) => response.json())
        .then((data: SpotifyResponse & { ERROR?: string }) => {
          if (data.ERROR) {
            setError(data.ERROR);
            setNowPlaying(lastPlayed);
          } else if (data?.item) {
            setNowPlaying((previousNowPlaying) => {
              if (previousNowPlaying && previousNowPlaying.item.id !== data.item.id) {
                setLastPlayed(previousNowPlaying);
              }
              return data;
            });
            setError(null);
          }
          setLoading(false);
        })
        .catch((fetchError: unknown) => {
          console.error("Error fetching now playing data:", fetchError);
          setError("Error fetching now playing data");
          setNowPlaying(lastPlayed);
          setLoading(false);
        });
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [lastPlayed]);

  const albumImage = useMemo(() => nowPlaying?.item.album.images[0]?.url ?? "", [nowPlaying]);

  return (
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
            <TrackInfo>{`by ${nowPlaying.item.artists.map((artist) => artist.name).join(", ")}`}</TrackInfo>
            <TrackInfo>{`in ${nowPlaying.item.album.name}`}</TrackInfo>
            {albumImage && <AlbumArt src={albumImage} alt={nowPlaying.item.album.name} />}
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
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      />
    </Layout>
  );
};

export default Music;

