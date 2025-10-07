import "./App.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../Components/topnav";
import { PageLayout, HeadingContainer, PageHeading } from "../Components/SharedStyledComponents";
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
  padding-top: 100%;
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
  object-fit: cover;
  object-position: center;
`;

const Playground: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string): void => {
    navigate(path);
  };

  return (
    <>
      <TopNav />
      <PlaygroundLayout>
        <PlaygroundHeadingContainer>
          <PageHeading>welcome to all things playground</PageHeading>
        </PlaygroundHeadingContainer>

        <TileContainer>
          <HoverableImageContainer onClick={() => navigateTo("/playground/strava")}>
            <HoverableImage src={strava} alt="strava activities" />
          </HoverableImageContainer>
          <Caption>stalk my activity</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={() => navigateTo("/playground/music")}>
            <HoverableImage src={spotify} alt="spotify" />
          </HoverableImageContainer>
          <Caption>stalk my music</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={() => navigateTo("/playground/Tft")}>
            <HoverableImage src={tft} alt="tft into the arcane" />
          </HoverableImageContainer>
          <Caption>stalk my tft</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={() => navigateTo("/playground/bookbar")}>
            <HoverableImage src={bookshelf} alt="bookshelf" />
          </HoverableImageContainer>
          <Caption>book bar</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={() => navigateTo("/playground/food")}>
            <HoverableImage src={cook} alt="cooking" />
          </HoverableImageContainer>
          <Caption>recipes and eats</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={() => navigateTo("/playground/poke")}>
            <HoverableImage src={poke} alt="poke mcp server" />
          </HoverableImageContainer>
          <Caption>poke mcp server</Caption>
        </TileContainer>
      </PlaygroundLayout>
    </>
  );
};

export default Playground;

