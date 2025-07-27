import styled from "styled-components";
import TopNav from '../../Components/topnav';
import React, { useState, useEffect } from "react";

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
    grid-auto-rows: 7rem auto auto;
    gap: 10px;
    padding: 20px 10px;
  }
`;

const HeadingContainer = styled.div`
  grid-column: span 3;
  margin-bottom: 2rem;
  text-align: center;
  @media (max-width: 768px) {
    grid-column: span 2;
    margin-bottom: 1.5rem;
  }
    
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  letter-spacing: 0.4rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Caption = styled.p`
  letter-spacing: 0.4rem;
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TabContainer = styled.div`
  grid-column: span 3;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-column: span 2;
    gap: 10px;
    margin-bottom: 1rem;
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  background-color: ${(props) => (props.active ? "#ddd" : "transparent")};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eee;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

const Bookshelf = styled.div`
  grid-column: span 3;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-column: span 2;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 10px;
  }
`;

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BookImage = styled.img`
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
  }
`;

const BookTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  margin: 0;
`;

const BookAuthor = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: #666;
  margin: 5px 0 0 0;
`;


const TileContainer = styled.div`
  aspect-ratio: 1;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const HoverableImageContainer = styled.div`
  width: 100%;
  padding-top: 100%; /* Creates a square aspect ratio */
  position: relative;
  transition: opacity 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.7;
  }
`;

const HoverableImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This maintains aspect ratio while filling the container */
  object-position: center;
`;

export default function Bookbar() {

  const [activeTab, setActiveTab] = useState("Finished");
  const [books, setBooks] = useState([]);

  const placeholderBooks = [
    { Title: "Book 1", Author: "Author 1", Status: "Finished" },
    { Title: "Book 2", Author: "Author 2", Status: "Finished" },
    { Title: "Book 3", Author: "Author 3", Status: "Reading" },
    { Title: "Book 4", Author: "Author 4", Status: "To read" },
  ];

  useEffect(() => {
    setBooks(placeholderBooks);
  }, []);

  const filteredBooks = books.filter((book) => book.Status === activeTab);
  
  return (
    <>
      <TopNav />
      <PageLayout>
        <HeadingContainer>
          <Heading>book bar</Heading>
          <Caption>A collection of books I'm reading or have read.</Caption>
        </HeadingContainer>
        <TabContainer>
          <Tab active={activeTab === "Finished"} onClick={() => setActiveTab("Finished")}>
            Finished
          </Tab>
          <Tab active={activeTab === "Reading"} onClick={() => setActiveTab("Reading")}>
            Reading
          </Tab>
          <Tab active={activeTab === "To read"} onClick={() => setActiveTab("To read")}>
            To Read
          </Tab>
        </TabContainer>
        <Bookshelf>
          {filteredBooks.map((book, index) => (
            <BookContainer key={index}>
              <BookImage src={`/books/Lei’s book shelf 1654466611d380369310f5081411d77a/The book shelf 1654466611d381269d04fcae75e81ec8/${book.Title}.jpg`} alt={book.Title} />
              <BookTitle>{book.Title}</BookTitle>
              <BookAuthor>{book.Author}</BookAuthor>
            </BookContainer>
          ))}
        </Bookshelf>
      </PageLayout>

    </>
  );
}
