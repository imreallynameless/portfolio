import React from "react"
import styled from 'styled-components';
import './App.css';

const Layout = styled.main`
  display: grid;
  max-height: 700px;
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

const TextContainer = styled.div`
  grid-column: span 2;
`

const Text = styled.p`
  font-size: 1.8rem;
  line-height: 2.8rem;
  overflow: auto;
`

const CustomLink = styled.a`
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`

export default function NotFoundPage() {
  return (
    <>
      <Layout>
        <HeadingContainer>
          <h1>
            404: Page Not Found
          </h1>
        </HeadingContainer>
        <TextContainer>
          <Text>
            <CustomLink href="/">Go to Home</CustomLink>
          </Text>
        </TextContainer>
      </Layout>
    </>
  )
}
