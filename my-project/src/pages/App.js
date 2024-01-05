
import './App.css';
import Footer from '../Components/Footer';
import styled from "styled-components";
import Resume from "../static/resume-lei.pdf";
import ContactDialog from "../Components/Dialog";
import Chip from "../images/chip.jpg";
import ResumePhoto from "../images/resume-image.jpg";
import Me from "../images/yes.jpg";


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
    grid-auto-rows: 3.5rem 2.5rem 1fr 1fr;
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

const TileContainer = styled.div``;

const HoverableImage = styled.img`
  transition: transform 0.3s ease-in-out; /* Add a smooth transition effect */

  &:hover {
    opacity: 0.7;
  }
`;



export default function App() {
  return (
    <> 
    <PageLayout>
        <HeadingContainer>
          <Heading>lei (lay) wu</Heading>
        </HeadingContainer>
        
        <ContactDialog />
        <TileContainer>
          <a href={Resume} target="_blank" rel="noreferrer">
            <HoverableImage src={Chip} alt="chip" />
        </a>
          <Caption>projects</Caption>
        </TileContainer>

        <TileContainer>
        <a href={Resume} target="_blank" rel="noreferrer">
            <HoverableImage src={Me} alt="chip" />
        </a>
          <Caption>about</Caption>
        </TileContainer>

        <TileContainer>
        <a href={Resume} target="_blank" rel="noreferrer">
            <HoverableImage src={ResumePhoto} alt="chip" />
        </a>
          <Caption>Resume</Caption>
        </TileContainer>

      
      </PageLayout>
      <Footer />







    </>


  );
}

