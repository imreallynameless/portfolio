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

function Projects() {
  return (
    <>
    <TopNav />
    <Layout>
        <HeadingContainer>
          <h1>Projects</h1>
        </HeadingContainer>
        <ProjectComponent
          title="Clear Vision"
          description = "An app that Uses AI to detect what type of trash is in front of the camera and tells the user how to dispose of it. Uses OpenCV and Tensorflow to detect what the current material in focus is, Python to perform calculations, and websockets for the real-time updates to the UI. A winner of Maker Con Challenger at Hack the Hill 2023 with over 100 category participants."
          image = {clearvision}
          url = "https://devpost.com/software/clean-vision"
          />
        <ProjectComponent
          title="Starry Stocks"
          description = "Uses real time data to display stock prices and volumes being traded with stars with the addition of anomalies which were any trade we found to be consider outliers. We have the constellations to  Uses websockets for the real-time , node/p5.js for backend/frontend respectively, and a little bit of statistics to display the data."
          image = {starrystocks}
          url = "https://devpost.com/software/solar-system-stocks"
        />
        <ProjectComponent
          title="Keyword-Based Search Engine "
          description = "Uses PageRank, cosine similarities, and TD-IDFs to rank web pages based on a user's search query. We orginally made the project in Python but then remade it in Java to intergrate a GUI (not so pretty)."
          image = {webcrawler}
          url = ""
        />
      </Layout>
    <Footer />
    </>
  )
}

export default Projects