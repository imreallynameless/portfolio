import './App.css';
import Footer from '../Components/Footer';
import styled from "styled-components";
import ContactDialog from "../Components/Dialog";
import Chip from "../images/chip.jpg";
import ResumePhoto from "../images/resume-image-500.jpg";
import ResumePhoto800 from "../images/resume-image-800.jpg";
import Me from "../images/yes-500.jpg";
import Me800 from "../images/yes-800.jpg";
import lei from "../images/lei.webp";
import patchnotes from "../images/patchnotes.webp";
import playground from "../images/playground-500.jpg";
import playground800 from "../images/playground-800.jpg";

const PageLayout = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 3.5rem 1fr 1fr auto;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 45px 20px;
  gap: 20px;
  /* Prevent layout shifts during loading */
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 7rem 7rem 1fr 2fr auto;
  }
`;

const HeadingContainer = styled.div`
  grid-column: span 2;
`;

const Heading = styled.h1`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  font-size: 3rem;
  letter-spacing: 0.4rem;
  /* Prevent layout shift during font loading */
  font-display: swap;
  line-height: 1.2;
  margin: 0;
`;

const Caption = styled.p`
  letter-spacing: 0.4rem;
  font-size: 1.3rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  /* Prevent layout shift during font loading */
  font-display: swap;
  line-height: 1.4;
  margin-bottom: 0;
`;



const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  /* Reserve space to prevent layout shifts */
  min-height: 400px;
  justify-content: flex-start;
`;

const FooterContainer = styled.div`
  grid-column: 1 / -1; /* Span all columns */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const HoverableImage = styled.img`
  transition: transform 0.3s ease-in-out; /* Add a smooth transition effect */
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  /* Prevent layout shift during image loading */
  display: block;
  background-color: #f5f5f5;

  &:hover {
    opacity: 0.7;
  }
`;

const HoverableImageContainer = styled.div`
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  /* Prevent layout shift by maintaining aspect ratio */
  width: 100%;
  max-width: 340px;
  aspect-ratio: 3/4; /* Standard aspect ratio for most images */
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5; /* Placeholder while loading */

  &:hover {
    opacity: 0.7;
  }
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

  const navigateToPlayground = () => {
    // Use JavaScript to navigate to the playground page
    window.location.href = "/playground";
  }

  const navigateToPatchnotes = () => {
    // Use JavaScript to navigate to the patchnotes page
    window.location.href = "/patchnotes";
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
            <HoverableImage src={Chip} alt="Projects" loading="lazy" decoding="async" />
          </HoverableImageContainer>
          <Caption>projects</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToAbout}>
            <HoverableImage 
              src={Me} 
              srcSet={`${Me} 500w, ${Me800} 800w`}
              sizes="(max-width: 768px) 50vw, 33vw"
              alt="About Lei Wu" 
              loading="lazy"
              decoding="async"
            />
          </HoverableImageContainer>
          <Caption>about</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToResume}>
        {/* <a href={Resume} target="_blank" rel="noreferrer"> */}
            <HoverableImage 
              src={ResumePhoto} 
              srcSet={`${ResumePhoto} 500w, ${ResumePhoto800} 800w`}
              sizes="(max-width: 768px) 50vw, 33vw"
              alt="Resume" 
              loading="lazy"
              decoding="async"
            />
            </HoverableImageContainer>    
        {/* </a> */}
          <Caption>resume</Caption>
        </TileContainer>

        <TileContainer>
        <HoverableImageContainer onClick={navigateToPatchnotes}>
            <HoverableImage src={patchnotes} alt="Website Patch Notes" loading="lazy" decoding="async"/>
        </HoverableImageContainer>
          <Caption>website patch notes</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToPlayground}>
        {/* <a href={Resume} target="_blank" rel="noreferrer"> */}
            <HoverableImage 
              src={playground} 
              srcSet={`${playground} 500w, ${playground800} 800w`}
              sizes="(max-width: 768px) 50vw, 33vw"
              alt="Playground" 
              loading="lazy"
              decoding="async"
            />
            </HoverableImageContainer>    
        {/* </a> */}
          <Caption>playground:click me!</Caption>
        </TileContainer>

        <TileContainer>
        <a href="https://drive.google.com/drive/folders/1_h2ZfbIYYnXxvJ5Qwi6ih7HVCbkNrE4X?usp=sharing" target="_blank" rel="noreferrer">
            <HoverableImage src={lei} alt="Design Portfolio" loading="lazy" decoding="async"/>
        </a>
          <Caption>design portfolio</Caption>
        </TileContainer>

        <FooterContainer>
          <Footer />
        </FooterContainer>
      
      </PageLayout>








    </>


  );
}
