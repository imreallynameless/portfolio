import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";
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
  min-height: 400px;
  justify-content: flex-start;
`;

const FooterContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const HoverableImage = styled.img`
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  background-color: #f5f5f5;

  &:hover {
    opacity: 0.7;
  }
`;

const HoverableImageContainer = styled.div`
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;

  &:hover {
    opacity: 0.7;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToProjects = (): void => {
    navigate("/projects");
  };

  const navigateToAbout = (): void => {
    navigate("/about");
  };

  const navigateToResume = (): void => {
    navigate("/resume");
  };

  const navigateToPlayground = (): void => {
    navigate("/playground");
  };

  const navigateToPatchnotes = (): void => {
    navigate("/patchnotes");
  };

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
            <HoverableImage
              src={ResumePhoto}
              srcSet={`${ResumePhoto} 500w, ${ResumePhoto800} 800w`}
              sizes="(max-width: 768px) 50vw, 33vw"
              alt="Resume"
              loading="lazy"
              decoding="async"
            />
          </HoverableImageContainer>
          <Caption>resume</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToPatchnotes}>
            <HoverableImage src={patchnotes} alt="Website Patch Notes" loading="lazy" decoding="async" />
          </HoverableImageContainer>
          <Caption>website patch notes</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer onClick={navigateToPlayground}>
            <HoverableImage
              src={playground}
              srcSet={`${playground} 500w, ${playground800} 800w`}
              sizes="(max-width: 768px) 50vw, 33vw"
              alt="Playground"
              loading="lazy"
              decoding="async"
            />
          </HoverableImageContainer>
          <Caption>playground:click me!</Caption>
        </TileContainer>

        <TileContainer>
          <HoverableImageContainer>
            <a
              href="https://drive.google.com/drive/folders/1_h2ZfbIYYnXxvJ5Qwi6ih7HVCbkNrE4X?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <HoverableImage src={lei} alt="Design Portfolio" loading="lazy" decoding="async" />
            </a>
          </HoverableImageContainer>
          <Caption>design portfolio</Caption>
        </TileContainer>

        <FooterContainer>
          <Footer />
        </FooterContainer>
      </PageLayout>
    </>
  );
};

export default Home;

