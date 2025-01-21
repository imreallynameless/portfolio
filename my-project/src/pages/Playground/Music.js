import React from "react";
import styled from "styled-components";
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

  return (
    <>
      <PlayNav />
      <Layout>
        <HeadingContainer>
          <h1>My Spotify Account</h1>
        </HeadingContainer>


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

