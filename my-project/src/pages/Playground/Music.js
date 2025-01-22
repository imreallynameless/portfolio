import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlayNav from '../../Components/playNav';
import Footer from '../../Components/Footer';

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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;



function Music() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      })
      .catch(error => {
        console.error('Error fetching now playing data:', error);
        setError('Error fetching now playing data');
        setNowPlaying(lastPlayed); // Set nowPlaying to lastPlayed on fetch failure
      });
  }, [lastPlayed]); // Include lastPlayed as a dependency

  return (
    <>
      <PlayNav />
      <Layout>
        <HeadingContainer>
          <Heading>stalk my music</Heading>
        </HeadingContainer>
        
        <CurrentTrackContainer>
        {nowPlaying ? (
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
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </Layout>
      <Footer />
    </>
  );
}



export default Music;
// import React from "react";
// import styled from "styled-components";
// import PlayNav from "../../Components/playNav";
// import Footer from "../../Components/Footer";

// const Layout = styled.main`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   grid-auto-rows: auto;
//   max-width: 1100px;
//   margin: auto;
//   align-items: center;
//   padding: 50px 20px;
//   gap: 20px;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//     grid-auto-rows: auto;
//   }
// `;

// const HeadingContainer = styled.div`
//   grid-column: span 3;

//   @media (max-width: 768px) {
//     grid-column: span 2;
//   }
// `;

// const CurrentTrackContainer = styled.div`
//   grid-column: span 3;
//   background: rgba(0, 0, 0, 0.05);
//   padding: 20px;
//   border-radius: 12px;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     grid-column: span 2;
//   }
// `;

// const TrackInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;
// `;

// const AlbumArt = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 8px;
// `;

// const TrackDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
// `;

// function Music() {

//   return (
//     <>
//       <PlayNav />
//       <Layout>
//         <HeadingContainer>
//           <h1>My Spotify Account</h1>
//         </HeadingContainer>


//         <iframe
//           style={{ borderRadius: "12px", gridColumn: "span 3" }}
//           src="https://open.spotify.com/embed/playlist/71gcONGYJKPYQiGRGYr6Qt?utm_source=generator&theme=0"
//           width="100%"
//           height="352px"
//           frameBorder="0"
//           allowFullScreen=""
//           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//           loading="lazy"
//         />
//       </Layout>
//       <Footer />
//     </>
//   );
// }

// export default Music;

