import React from "react";
import styled from "styled-components";
import TopNav from "../Components/topnav";
import { FlexLayout, HeadingContainer, PageHeading } from "../Components/SharedStyledComponents";
import ProjectComponent from "../Components/Project";
import clearvision from "../images/clearvision.jpg";
import starrystocks from "../images/starrystocks.jpg";
import webcrawler from "../images/webcrawler.png";
import investology from "../images/investology.jpg";
import website from "../images/website.png";
import playground from "../images/playground.png";

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

const PGdescriptionText = `Created a playground that acts as sort of a playground for me to practice and test out new ideas and small projects.
Some examples include having the Spotify API to display my current playing song, a TFT match history tracker, bookbar and a cooking recipe finder. It's a lot of 
fun trying to make this website in the full stack-app. Planning on trying to add something database related to play around with those.
The next steps here is to try and upgrade the website to be using vite.
`;

const PWdescriptionText = `Created a personal website that acts as sort of a playground for me to practice and test out new ideas and small projects. Find more about the website in the patch notes.
`;

const TSdescriptionText = `Developed an algorithm that offers a investment portfolio recommendation based on the user's MBTI after they complete a MBTI test.
Utilized vite and react to create a responsive web application that allows users to take the MBTI test and receive their investment portfolio recommendation.
Used FastAPI to pull quesiton data that is mapped to the 16personalities API to determine the user's MBTI. Also created our own API to take in test data and
return the user's investment portfolio recommendation.
`;

const CVdescriptionText = `Trained an AI model using OpenCV, Tensorflow, and Python 
for identifying the waste type of the object currently in focus. 
Enabled real-time updates to the user interface by leveraging WebSockets 
to establish connectivity between the client and server-side. 
Winner of 100+ teams at Hack the Hill Maker Con Challenge, 
successfully developing an app that sorts through waste.`;

const SSdescriptionText = `Processed over 200,000 data points stored in JSON files, parsing them to extract successfully processed transactions.
Built a web application using p5 capable of receiving data points through WebSockets to visualize stock transactions featuring a unique design.
Identified outliers within transaction data by applying statistical models to the data collected over the trading time frame.`;

const KBSEdescriptionText = `Built a web‑crawler in Python to capture and parse webpage text, enabling the determination of search weightings.
Developed search query functionality involving PageRank, cosine similarities, and TF‑IDFs to retrieve high ranking webpages.
Stored search quantities using various document database paradigms to improve runtime complexity.`;

const Projects: React.FC = () => (
  <>
    <TopNav />
    <FlexLayout>
      <HeadingContainer>
        <PageHeading>projects</PageHeading>
      </HeadingContainer>
      <ProjectsContainer>
        <ProjectComponent
          title="Playground"
          description={PGdescriptionText}
          image={playground}
          url="https://laywu.ca/playground"
          imageAlt="Screenshot of Lei's playground website featuring various interactive components"
        />
        <ProjectComponent
          title="Personal Website"
          description={PWdescriptionText}
          image={website}
          url="https://laywu.ca/patchnotes"
          imageAlt="Screenshot of Lei's personal portfolio website"
        />
        <ProjectComponent
          title="Investology"
          description={TSdescriptionText}
          image={investology}
          url="https://devpost.com/software/tarot-investing"
          imageAlt="Screenshot of Investology app showing MBTI-based investment recommendations"
        />
        <ProjectComponent
          title="Clear Vision"
          description={CVdescriptionText}
          image={clearvision}
          url="https://devpost.com/software/clean-vision"
          imageAlt="Screenshot of Clear Vision waste sorting AI application"
        />
        <ProjectComponent
          title="Starry Stocks"
          description={SSdescriptionText}
          image={starrystocks}
          url="https://devpost.com/software/solar-system-stocks"
          imageAlt="Screenshot of Starry Stocks data visualization application"
        />
        <ProjectComponent
          title="Keyword-Based Search Engine"
          description={KBSEdescriptionText}
          image={webcrawler}
          imageAlt="Diagram of web crawler and search engine architecture"
        />
      </ProjectsContainer>
    </FlexLayout>
  </>
);

export default Projects;

