import React from "react";
import styled from "styled-components";
import "./App.css";
import TopNav from "../Components/topnav";
import { GridLayout, HeadingContainer, PageHeading, BodyText } from "../Components/SharedStyledComponents";
import Me from "../images/yes2.jpg";

const ImageWrapper = styled.div`
  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

const TextContainer = styled.div`
  grid-column: span 2;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const About: React.FC = () => (
  <>
    <TopNav />
    <GridLayout>
      <HeadingContainer>
        <PageHeading>about me</PageHeading>
      </HeadingContainer>
      <ImageWrapper>
        <ProfileImage
          src={Me}
          alt="Lei Wu - Computer Science student and software developer"
          loading="lazy"
          decoding="async"
        />
      </ImageWrapper>
      <TextContainer>
        <BodyText>
          Hi! I'm Lei (/leɪ/) Wu, a 4th year computer science student at Carleton University. I'm currently in search of an
          internship/coop opportunity for the summer 2026 term. I have coop experience in data analysis, project coordination,
          and software development; I'm looking to expand my knowledge in the world of product management and building
          products/ideas
          <br />
          <br />
          In my spare time, I love to travel and explore new foods, the photos on the website are from my recent trip to the east.
          I enjoy living healthy by being a gym rat (230B | 275S | 405DL | Weight 175lbs - sept 2025) I also have a burning
          passion for being great at what I do which can be showcased from my hitting leaderboard ranks in 3 Riot Games titles.
        </BodyText>
      </TextContainer>
    </GridLayout>
  </>
);

export default About;

