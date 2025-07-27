import React from 'react'
import TopNav from '../Components/topnav'
import Footer from '../Components/Footer'
import styled from 'styled-components'
import ProjectComponent from '../Components/Project'
import clearvision from '../images/clearvision.jpg'
import starrystocks from '../images/starrystocks.jpg'
import webcrawler from '../images/webcrawler.png'
import investology from '../images/investology.jpg'
import website from '../images/website.png'

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


const PWdescriptionText = `Created personal website that acts as sort of a playground for me to practice and test out new ideas and small projects.
Some examples include having the Spotify API to display my current playing song, a TFT match history tracker, and a cooking recipe finder. It's a lot of 
fun trying to make this website in the full stack-app. Planning on trying to add something database related to play around with those.
The next steps here is to try and upgrade the website to be using vite.
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
          <Heading> projects </Heading>
        </HeadingContainer>
        <ProjectComponent
          title="Personal Website"
          description = {PWdescriptionText}
          image = {website}
          url = "https://laywu.ca/playground"
        />
        <ProjectComponent
          title="Investology"
          description = {TSdescriptionText}
          image = {investology}
          url = "https://devpost.com/software/tarot-investing"
        />
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