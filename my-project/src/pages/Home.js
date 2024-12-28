
import './App.css';
import Footer from '../Components/Footer';
import styled from "styled-components";
import ContactDialog from "../Components/Dialog";
import Chip from "../images/chip.jpg";
import ResumePhoto from "../images/resume-image.jpg";
import Me from "../images/yes.jpg";
import lei from "../images/lei.jpg";
import bookshelf from "../images/bookshelf.jpg";
import cook from "../images/cook.jpg";

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
  grid-column: span 2;
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


export default function Home() {
  const navigateToProjects = () => {
    // Use JavaScript to navigate to the projects page
    window.location.href = "/projects";
  };

  const navigateToAbout = () => {
    // Use JavaScript to navigate to the about page
    window.location.href = "/about";
  };
  
  const navigateToResume = () => {
    // Use JavaScript to navigate to the resume page
    window.location.href = "/resume";
  }

  const navigateToFood = () => {
    // Use JavaScript to navigate to the 404 page
    window.location.href = "/food";
  }



  return (
    <> 
    <PageLayout>
        <HeadingContainer>
          <Heading>lei (lay) wu</Heading>
        </HeadingContainer>
        
        <ContactDialog />
        <TileContainer>
          <HoverableImageContainer onClick={navigateToProjects}>
            <HoverableImage src={Chip} alt="" placeholder="blurred" />
          </HoverableImageContainer>
          <Caption>projects</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToAbout}>
            <HoverableImage src={Me} alt="" placeholder="blurred" />
          </HoverableImageContainer>
          <Caption>about</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToResume}>
        {/* <a href={Resume} target="_blank" rel="noreferrer"> */}
            <HoverableImage src={ResumePhoto} alt="" placeholder = "blurred"/>
            </HoverableImageContainer>    
        {/* </a> */}
          <Caption>resume</Caption>
        </TileContainer>

        <TileContainer>
        <a href="https://drive.google.com/drive/folders/1_h2ZfbIYYnXxvJ5Qwi6ih7HVCbkNrE4X?usp=sharing" target="_blank" rel="noreferrer">
            <HoverableImage src={lei} alt="" placeholder = "blurred"/>
        </a>
          <Caption>design portfolio</Caption>
        </TileContainer>

        <TileContainer>
        <a href="https://burly-column-279.notion.site/Lei-s-book-shelf-1654466611d380369310f5081411d77a" target="_blank" rel="noreferrer">
            <HoverableImage src={bookshelf} alt="" placeholder = "blurred"/>
        </a>
          <Caption>what i'm reading</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToFood}>
        {/* <a href={Resume} target="_blank" rel="noreferrer"> */}
            <HoverableImage src={cook} alt="" placeholder = "blurred"/>
            </HoverableImageContainer>    
        {/* </a> */}
          <Caption>recipes and eats</Caption>
        </TileContainer>

        <caption> </caption>


      
      </PageLayout>

      <Footer />







    </>


  );
}
