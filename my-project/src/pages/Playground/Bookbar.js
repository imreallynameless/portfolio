import styled from "styled-components";
import PlayNav from '../../Components/playNav'
import React, { useState, useEffect } from "react";

const PageLayout = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 45px 20px;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 20px 10px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 20px 5px;
    gap: 5px;
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
  @media (max-width: 480px) {
    grid-column: span 1;
  }
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  letter-spacing: 0.4rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    letter-spacing: 0.3rem;
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
  @media (max-width: 480px) {
    font-size: 0.7rem;
    letter-spacing: 0.3rem;
  }
`;

const CategoryHeading = styled.h2`
  grid-column: span 3;
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0.3rem;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-column: span 2;
    font-size: 1.4rem;
  }
  @media (max-width: 480px) {
    grid-column: span 1;
    font-size: 1.1rem;
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
  @media (max-width: 480px) {
    grid-column: span 1;
    flex-direction: column;
    gap: 5px;
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
  @media (max-width: 480px) {
    grid-column: span 1;
  }
`;

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;

  &:hover img {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    transform: scale(1.02);
  }
`;

const BookImage = styled.img`
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

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

const BookCover = ({ title, imageUrl }) => {
  return <BookImage src={imageUrl || 'https://via.placeholder.com/150x220'} alt={title} />;
};

export default function Bookbar() {
  const [activeTab, setActiveTab] = useState("all");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/book-data.json");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = activeTab === "all" ? books : books.filter((book) => book.Status === activeTab);
  const statuses = ["finished", "reading", "to read", "dropped"];

  return (
    <>
      <PlayNav/>
      <PageLayout>
        <HeadingContainer>
          <Heading>book bar</Heading>
          <Caption>a collection of books I'm reading or have read.</Caption>
        </HeadingContainer>
        <TabContainer>
          <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            all
          </Tab>
          <Tab active={activeTab === "finished"} onClick={() => setActiveTab("finished")}>
            finished
          </Tab>
          <Tab active={activeTab === "reading"} onClick={() => setActiveTab("reading")}>
            reading
          </Tab>
          <Tab active={activeTab === "to read"} onClick={() => setActiveTab("to read")}>
            to read
          </Tab>
          <Tab active={activeTab === "dropped"} onClick={() => setActiveTab("dropped")}>
            dropped
          </Tab>
        </TabContainer>
        {activeTab !== "all" ? (
          <Bookshelf>
            {filteredBooks.map((book, index) => (
              <BookContainer key={index}>
                <BookCover title={book.Title} imageUrl={book.cover} />
                <BookTitle>{book.Title}</BookTitle>
                <BookAuthor>{book.Author}</BookAuthor>
              </BookContainer>
            ))}
          </Bookshelf>
        ) : (
          statuses.map((status) => {
            const booksForStatus = books.filter(
              (book) => book.Status === status
            );
            if (booksForStatus.length === 0) return null;
            return (
              <React.Fragment key={status}>
                <CategoryHeading>{status}</CategoryHeading>
                <Bookshelf>
                  {booksForStatus.map((book, index) => (
                    <BookContainer key={`${status}-${index}`}>
                      <BookCover title={book.Title} imageUrl={book.cover} />
                      <BookTitle>{book.Title}</BookTitle>
                      <BookAuthor>{book.Author}</BookAuthor>
                    </BookContainer>
                  ))}
                </Bookshelf>
              </React.Fragment>
            );
          })
        )}
      </PageLayout>
    </>
  );
}
