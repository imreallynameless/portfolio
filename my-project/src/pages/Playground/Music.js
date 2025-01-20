import React from "react"
import styled from 'styled-components'
import PlayNav from "../../Components/playNav";
import Footer from "../../Components/Footer";


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



function Music() {
  return (
    <>
    <PlayNav />
    <Layout>
      <HeadingContainer>
        <h1>
          My Spotify Account
        </h1>
      </HeadingContainer>
    </Layout>
    <Footer />
  </>
  )
}

export default Music