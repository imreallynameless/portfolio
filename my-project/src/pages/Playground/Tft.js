import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlayNav from '../../Components/playNav';
import Footer from '../../Components/Footer';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  margin: auto;
  padding: 50px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Heading = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 5rem;
  letter-spacing: 0.4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const MatchContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const MatchCard = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    margin: 8px 0;
    color: #666;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  color: #6c757d;
  padding: 20px;
  text-align: center;
`;

function Tft() {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [rank, setRank] = useState('');
    const [leaguePoints, setLeaguePoints] = useState(0);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const fetchMatchHistory = async () => {
      if (!gameName || !tagLine) {
        setError('Please enter both Game Name and Tag Line');
        return;
      }
  
      setLoading(true);
      setError('');
  
      try {
        // Step 1: Fetch the match history
        const matchHistoryResponse = await fetch(
          `https://riot-tft.leiwuhoo.workers.dev/get-tft-match-history?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
        );
  
        if (!matchHistoryResponse.ok) {
          throw new Error('Failed to fetch match history');
        }
  
        const matchHistoryData = await matchHistoryResponse.json();
        setMatches(matchHistoryData);
  
        // Step 2: Fetch the PUUID from the first match (assuming all matches have the same PUUID)
        const puuid = matchHistoryData[0]?.metadata?.participants[0];
        if (!puuid) {
          throw new Error('Failed to fetch PUUID from match history');
        }
  
        // Step 3: Use the handleSummonerId function to fetch summoner ID, rank, and league points
        const summonerResponse = await fetch(
          `https://riot-tft.leiwuhoo.workers.dev/get-summoner-id?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
        );
  
        if (!summonerResponse.ok) {
          throw new Error('Failed to fetch summoner data');
        }
  
        const summonerData = await summonerResponse.json();
  
        if (summonerData.length > 0) { // Check if the array is not empty
            const rankedEntry = summonerData[0]; // Access the first element
            setRank(`${rankedEntry.tier} ${rankedEntry.rank}`);
            setLeaguePoints(rankedEntry.leaguePoints);
        } 
        else {
            setRank('Unranked');
            setLeaguePoints(0);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <PlayNav />
        <Layout>
          <HeadingContainer>
            <Heading>stalk my tft match history</Heading>
            <h2>'lay' in Game Name and 'chip' in Tag Line</h2>
            <h2>or try your own Username (North America region only)</h2>
            {rank && <p>Rank: {rank}</p>}
            {leaguePoints !== null && <p>League Points: {leaguePoints}</p>}
          </HeadingContainer>
  
          <SearchContainer>
            <input
              type="text"
              placeholder="Game Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tag Line (e.g., NA1)"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
            />
            <button onClick={fetchMatchHistory}>Search</button>
          </SearchContainer>
  
          {loading && <LoadingMessage>Loading match history...</LoadingMessage>}
  
          {error && <ErrorMessage>{error}</ErrorMessage>}
  
          <MatchContainer>
            {matches.map((match, index) => (
              <MatchCard key={index}>
                <h3>Match {index + 1}</h3>
                <p>Date: {new Date(match.info.game_datetime).toLocaleDateString()}</p>
                <p>Placement: {
                  match.info.participants.find(
                      p => p.riotIdGameName.toLowerCase() === gameName.toLowerCase() &&
                          p.riotIdTagline.toLowerCase() === tagLine.toLowerCase()
                  )?.placement || 'N/A'
                  }</p>
                <p>Game Length: {Math.floor(match.info.game_length / 60)} minutes</p>
              </MatchCard>
            ))}
          </MatchContainer>
        </Layout>
        <Footer />
      </>
    );
  }
  
  export default Tft;