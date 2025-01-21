import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import PlayNav from "../../Components/playNav";
import Footer from "../../Components/Footer";

const Layout = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 50px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
  }
`;

const HeadingContainer = styled.div`
  grid-column: span 3;

  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

const CurrentTrackContainer = styled.div`
  grid-column: span 3;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AlbumArt = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function Music() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);

  const fetchCurrentTrack = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/current-track');
      const data = await response.json();
      setCurrentTrack(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch current track");
    }
  };

  useEffect(() => {
    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PlayNav />
      <Layout>
        <HeadingContainer>
          <h1>My Spotify Account</h1>
        </HeadingContainer>

        <CurrentTrackContainer>
          {error ? (
            <p>Error: {error}</p>
          ) : currentTrack?.isPlaying ? (
            <TrackInfo>
              {currentTrack.track.albumArt && (
                <AlbumArt src={currentTrack.track.albumArt} alt="Album Art" />
              )}
              <TrackDetails>
                <h2>{currentTrack.track.name}</h2>
                <p>{currentTrack.track.artist}</p>
                <p>{currentTrack.track.album}</p>
                <a href={currentTrack.track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                  Open in Spotify
                </a>
              </TrackDetails>
            </TrackInfo>
          ) : (
            <p>No track currently playing</p>
          )}
        </CurrentTrackContainer>

        <iframe 
          style={{ borderRadius: "12px", gridColumn: "span 3" }} 
          src="https://open.spotify.com/embed/playlist/71gcONGYJKPYQiGRGYr6Qt?utm_source=generator&theme=0" 
          width="100%" 
          height="352 px" 
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

// import React, { useState, useEffect } from "react"
// import styled from 'styled-components'
// import PlayNav from "../../Components/playNav";
// import Footer from "../../Components/Footer";


// const Layout = styled.main`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   grid-auto-rows: 200px 1fr;
//   max-width: 1100px;
//   margin: auto;
//   align-items: center;
//   padding: 50px 20px;
//   gap: 20px;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//     grid-auto-rows: 150px 1fr 1fr;
//   }
// `

// const HeadingContainer = styled.div`
//   grid-column: span 3;

//   @media (max-width: 768px) {
//     grid-column: span 2;
//   }
// `

// const ImageWrapper = styled.div`
//   @media (max-width: 768px) {
//     grid-column: span 2;
//   }
// `

// const TextContainer = styled.div`
//   grid-column: span 2;
// `

// const Text = styled.p`
//   font-size: 1.8rem;
//   line-height: 2.8rem;
//   overflow: auto;
// `



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
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchCurrentTrack = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/current-track');
//       const data = await response.json();
      
//       if (response.status === 401) {
//         // Instead of directly redirecting, open auth in a new window
//         window.open(data.auth_url, 'spotify-auth-window', 'width=600,height=800');
//         return;
//       }
      
//       setCurrentTrack(data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch current track");
//     }
//   };

//   // Check for auth completion
//   useEffect(() => {
//     const checkAuth = setInterval(() => {
//       fetchCurrentTrack();
//     }, 5000);

//     return () => clearInterval(checkAuth);
//   }, []);

//   return (
//     <>
//       <PlayNav />
//       <Layout>
//         <HeadingContainer>
//           <h1>My Spotify Account</h1>
//         </HeadingContainer>

//         <CurrentTrackContainer>
//           {error ? (
//             <p>Error: {error}</p>
//           ) : currentTrack?.isPlaying ? (
//             <TrackInfo>
//               {currentTrack.track.albumArt && (
//                 <AlbumArt src={currentTrack.track.albumArt} alt="Album Art" />
//               )}
//               <TrackDetails>
//                 <h2>{currentTrack.track.name}</h2>
//                 <p>{currentTrack.track.artist}</p>
//                 <p>{currentTrack.track.album}</p>
//                 <a href={currentTrack.track.spotifyUrl} target="_blank" rel="noopener noreferrer">
//                   Open in Spotify
//                 </a>
//               </TrackDetails>
//             </TrackInfo>
//           ) : (
//             <p>No track currently playing</p>
//           )}
//         </CurrentTrackContainer>

//         {/* Your existing iframe */}
//         {/* <iframe 
//           style={{ borderRadius: "12px" }} c
//           src="https://open.spotify.com/embed/playlist/71gcONGYJKPYQiGRGYr6Qt?utm_source=generator&theme=0" 
//           width="300%" 
//           height="352rem" 
//           frameBorder="0" 
//           allowfullscreen="" 
//           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
//           loading="lazy"
//         /> */}
//       </Layout>
//       <Footer />
//     </>
//   );
// }

// export default Music;