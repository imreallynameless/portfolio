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
    grid-auto-rows:7rem 7rem 1fr 2fr;
  }
`;

const HeadingContainer = styled.div`
  grid-column: span 3;
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  letter-spacing: 0.4rem;
`;

const Caption = styled.p`
  letter-spacing: 0.4rem;
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
`;



const TileContainer = styled.div
`
`;

const HoverableImage = styled.img`
  transition: transform 0.3s ease-in-out; /* Add a smooth transition effect */

  &:hover {
    opacity: 0.7;
  }
`;

const HoverableImageContainer = styled.div`
  transition: transform 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const HoverableImageStyled = styled(HoverableImage)`
  width: 100%;
  height: 100%;
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
          <Heading>Welcome to All Things Playground</Heading>
        </HeadingContainer>
        


        <TileContainer>
          <HoverableImageContainer onClick={navigateToFood}>
            <HoverableImage src={cook} alt="" placeholder = "blurred"/>
            </HoverableImageContainer>    
          <Caption>recipes and eats</Caption>
        </TileContainer>

        <TileContainer>
            <HoverableImageContainer onClick={navigateToMusic}>
                <HoverableImage src={spotify} alt="" placeholder = "blurred"/>
                </HoverableImageContainer>    
            <Caption>stalk my music</Caption>
        </TileContainer>

        <caption> </caption>


      
      </PageLayout>

      <Footer />







    </>


  );
}
