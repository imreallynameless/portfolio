import './App.css';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import TopNav from '../Components/topnav';
import { PageLayout, HeadingContainer, PageHeading } from '../Components/SharedStyledComponents';
import cook from "../images/cook.jpg";
import spotify from "../images/spotify.png";
import tft from "../images/tfts15.avif";
import bookshelf from "../images/bookshelf.jpg";
import strava from "../images/strava.webp";
import poke from "../images/poke.webp";

const PlaygroundLayout = styled(PageLayout)`
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 3.5rem 1fr 1fr 1fr 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 7rem auto auto auto auto;
    gap: 10px;
  }
`;

const PlaygroundHeadingContainer = styled(HeadingContainer)`
  grid-column: span 3;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    grid-column: span 2;
    margin-bottom: 3rem;
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
  cursor: pointer;
  
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
  const navigate = useNavigate();

  const navigateToFood = () => {
    navigate("/playground/food");
  };
  
  const navigateToMusic = () => {
    navigate("/playground/music");
  };

  const navigateToTft = () => {
    navigate("/playground/Tft");
  };
  
  const navigateToBookshelf = () => {
    navigate("/playground/bookbar");
  };
  
  const navigateToStrava = () => {
    navigate("/playground/strava");
  };
  
  const navigateToPoke = () => {
    navigate("/playground/poke");
  };
  
  return (
    <>
      <TopNav />
      <PlaygroundLayout>
        <PlaygroundHeadingContainer>
          <PageHeading>welcome to all things playground</PageHeading>
        </PlaygroundHeadingContainer>
        
        <TileContainer>
          <HoverableImageContainer onClick={navigateToStrava}>
            <HoverableImage src={strava} alt="strava activities" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>stalk my activity</Caption>
        </TileContainer>
        
        <TileContainer>
          <HoverableImageContainer onClick={navigateToMusic}>
            <HoverableImage src={spotify} alt="spotify" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>stalk my music</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToTft}>
            <HoverableImage src={tft} alt="tft into the arcane" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>stalk my tft</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToBookshelf}>
            <HoverableImage src={bookshelf} alt="bookshelf" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>book bar</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToFood}>
            <HoverableImage src={cook} alt="cooking" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>recipes and eats</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToPoke}>
            <HoverableImage src={poke} alt="poke mcp server" placeholder="blurred"/>
          </HoverableImageContainer>    
          <Caption>poke mcp server</Caption>
        </TileContainer>
      </PlaygroundLayout>
    </>
  );
}
