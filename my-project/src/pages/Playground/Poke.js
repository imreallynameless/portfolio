import React, { useEffect } from 'react';
import styled from 'styled-components';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1100px;
  margin: auto;
  padding: 50px 20px;
  min-height: 70vh;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const RedirectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// SubHeading component removed as it was unused

const RedirectMessage = styled.p`
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const GitHubLink = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const CountdownText = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin-top: 1rem;
`;

function Poke() {
  useEffect(() => {
    // Redirect to GitHub repo after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://github.com/imreallynameless/Poke-X-Twitter-MCP-Server';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualRedirect = () => {
    window.open('https://github.com/imreallynameless/Poke-X-Twitter-MCP-Server', '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
          <RedirectContainer>
            <Heading>🚀 poke mcp server</Heading>
            
            <RedirectMessage>
              a mcp server that provides twitter metrics 
              and automated posting reminders with poke integration.
            </RedirectMessage>
            
            
            <GitHubLink onClick={handleManualRedirect}>
              view on github
            </GitHubLink>
            
            <CountdownText>
              redirecting to github repository in 3 seconds...
            </CountdownText>
        </RedirectContainer>
      </Layout>
  );
}

export default Poke;
