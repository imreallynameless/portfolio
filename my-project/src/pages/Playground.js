import './App.css';
import Footer from '../Components/Footer';
import styled from "styled-components";
import TopNav from '../Components/topnav';
import cook from "../images/cook.jpg";
import spotify from "../images/spotify.png";

const PageLayout = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 3.5rem 1fr 1fr;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 45px 20px;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 7rem auto auto;
    gap: 10px;
  }
`;

const HeadingContainer = styled.div`
  grid-column: span 3;
  margin-bottom: 5rem;
  text-align: center;
  @media (max-width: 768px) {
    grid-column: span 2;
    margin-bottom: 3rem;
  }
    
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  letter-spacing: 0.4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Caption = styled.p`
  letter-spacing: 0.4rem;
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TileContainer = styled.div`
  aspect-ratio: 1;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const HoverableImageContainer = styled.div`
  width: 100%;
  padding-top: 100%; /* Creates a square aspect ratio */
  position: relative;
  transition: opacity 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.7;
  }
`;

const HoverableImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This maintains aspect ratio while filling the container */
  object-position: center;
`;

export default function Playground() {
  const navigateToFood = () => {
    window.location.href = "playground/food";
  }
  
  const navigateToMusic = () => {
    window.location.href = "playground/music";
  }
  
  return (
    <>
      <PageLayout>
        <TopNav />
        <HeadingContainer>
          <Heading>welcome to all things playground</Heading>
        </HeadingContainer>
        
        <TileContainer>
          <HoverableImageContainer onClick={navigateToFood}>
            <HoverableImage src={cook} alt="Cooking" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>recipes and eats</Caption>
        </TileContainer>
        
        <TileContainer>
          <HoverableImageContainer onClick={navigateToMusic}>
            <HoverableImage src={spotify} alt="Spotify" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>stalk my music</Caption>
        </TileContainer>
      </PageLayout>
      <Footer />
    </>
  );
}
