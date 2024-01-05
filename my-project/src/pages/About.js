import React from "react"
import styled from 'styled-components'
import './App.css';
import TopNav from "../Components/topnav";
import Footer from "../Components/Footer";
import Me from "../images/yes2.jpg";

const Layout = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px 1fr;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 50px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px 1fr 1fr;
  }
`

const HeadingContainer = styled.div`
  grid-column: span 3;

  @media (max-width: 768px) {
    grid-column: span 2;
  }
`

const ImageWrapper = styled.div`
  @media (max-width: 768px) {
    grid-column: span 2;
  }
`

const TextContainer = styled.div`
  grid-column: span 2;
`

const Text = styled.p`
  font-size: 1.8rem;
  line-height: 2.8rem;
  overflow: auto;
`



function About() {
  return (
    <>
    <TopNav />
    <Layout>
      <HeadingContainer>
        <h1>
          About Me
        </h1>
      </HeadingContainer>
      <ImageWrapper>
        <img src={Me} alt="" placeholder="blurred"></img>
      </ImageWrapper>
      <TextContainer>
        <Text>
            Hi! I'm Lei (/leɪ/) Wu, a 3rd year computer science student at Carleton University. I have just recently finished all of my 2nd year courses and 
            am currently in search of an internship/coop opportunity for the summer/fall 2024 terms.
          <br/><br/>
          I love to travel and explore new foods, the photos on the website are from my recent trip to the east. I enjoy living healthy by being a gym rat (230B | 275S | 365DL | Weight 169lbs - Sept 2023)
          I also have a burning passion for being great at what I do which can be showcased from my hitting leaderboard ranks in 3 Riot Games titles.
           
        </Text>
      </TextContainer>
    </Layout>
    <Footer />
  </>
  )
}

export default About