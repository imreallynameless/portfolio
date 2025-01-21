import React from 'react'
import TopNav from '../Components/topnav'
import Footer from '../Components/Footer'
import styled from 'styled-components'
import ProjectComponent from '../Components/Project'
import ProjectData from '../static/projectData.json';
import clearvision from '../images/clearvision.jpg'
import starrystocks from '../images/starrystocks.jpg'
import webcrawler from '../images/webcrawler.png'


const Layout = styled.main`
  display: grid;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 50px 20px;
  gap: 50px;

  @media (max-width: 768px) {
    max-width: 500px;
  }
`;

const HeadingContainer = styled.div`
  padding: 40px 0;
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 5rem;
  letter-spacing: 0.4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


const CVdescriptionText = `Trained an AI model using OpenCV, Tensorflow, and Python 
for identifying the waste type of the object currently in focus. 
Enabled real-time updates to the user interface by leveraging WebSockets 
to establish connectivity between the client and server-side. 
Winner of 100+ teams at Hack the Hill Maker Con Challenge, 
successfully developing an app that sorts through waste.`;

const SSdescriptionText = 
`Processed over 200,000 data points stored in JSON files, parsing them to extract successfully processed transactions.
Built a web application using p5 capable of receiving data points through WebSockets to visualize stock transactions featuring a unique design.
Identified outliers within transaction data by applying statistical models to the data collected over the trading time frame.`;

const KBSEdescriptionText =
`Built a web‑crawler in Python to capture and parse webpage text, enabling the determination of search weightings.
Developed search query functionality involving PageRank, cosine similarities, and TF‑IDFs to retrieve high ranking webpages.
Stored search quantities using various document database paradigms to improve runtime complexity.`;



function Projects() {
  return (
    <>
    <TopNav />
    <Layout>
        <HeadingContainer>
          <Heading> Projects </Heading>
        </HeadingContainer>
        <ProjectComponent
          title="Clear Vision"
          description = {CVdescriptionText}
          image = {clearvision}
          url = "https://devpost.com/software/clean-vision"
          />
        <ProjectComponent
          title="Starry Stocks"
          description = {SSdescriptionText}
          image = {starrystocks}
          url = "https://devpost.com/software/solar-system-stocks"
        />
        <ProjectComponent
          title="Keyword-Based Search Engine "
          description = {KBSEdescriptionText}
          image = {webcrawler}
          url = ""
        />
      </Layout>
    <Footer />
    </>
  )
}

export default Projects