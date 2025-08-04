import React, { useState } from 'react';
import styled from 'styled-components';
import PlayNav from '../../Components/playNav';

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

const RecentGamesContainer = styled.div`
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const RecentGamesHeader = styled.h2`
  font-family: "Inter", sans-serif;
  margin-top: 0;
  font-size: 1.5rem;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const StatsAndGridContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-shrink: 0;
`;

const StatBox = styled.div`
  text-align: center;
  
  p {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  h3 {
    margin: 5px 0 0;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const HistoryGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  overflow-x: auto;
  width: 100%;
  justify-content: center;
`;

const PlacementBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${props => {
    if (props.placement === '-') return '#e9ecef';
    if (props.placement === 1) return '#28a745'; // Green
    if (props.placement <= 4) return '#007bff'; // Blue
    return '#6c757d'; // Grey
  }};
  color: white;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
`;

const DetailedHistoryContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const DetailedMatchRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  text-align: left;

  &:nth-child(even) {
    background-color: #e9ecef;
  }
  p {
    margin: 0;
  }
  h4 {
    margin: 0 0 5px 0;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    text-align: center;
  }
`;

const PlacementPill = styled.span`
  padding: 5px 15px;
  border-radius: 15px;
  font-weight: bold;
  color: white;
  justify-self: end;
  background-color: ${props => {
    if (props.placement === 1) return '#28a745';
    if (props.placement <= 4) return '#007bff';
    return '#6c757d';
  }};
  @media (max-width: 480px) {
    justify-self: center;
  }
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

const RankContainer = styled.div`
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  background-color: #f8f9fa;
  font-family: "Inter", sans-serif;
`;

const RankHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 20px;

  img {
    width: 80px;
    height: 80px;
  }

  div {
    flex: 1;
  }

  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: #d4af37; // Gold color
  }

  p {
    margin: 5px 0 0;
    color: #6c757d;
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .label {
    font-size: 0.9rem;
    color: #6c757d;
    display: flex;
    justify-content: space-between;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .bar-container {
    background-color: #e9ecef;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar {
    height: 100%;
    background-color: #28a745;
    transition: width 0.3s;
  }

  .top-label {
    font-size: 0.8rem;
    color: #6c757d;
    text-align: right;
  }
`;

function Tft() {
    const [gameName, setGameName] = useState('lay');
    const [tagLine, setTagLine] = useState('chip');
    const [rank, setRank] = useState('');
    const [leaguePoints, setLeaguePoints] = useState(null);
    const [matches, setMatches] = useState([]);
    const [placements, setPlacements] = useState([]);
    const [avgRank, setAvgRank] = useState(null);
    const [wins, setWins] = useState(null);
    const [top4s, setTop4s] = useState(null);
    const [rankedWins, setRankedWins] = useState(null);
    const [rankedLosses, setRankedLosses] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const fetchMatchHistory = async () => {
      if (!gameName || !tagLine) {
        setError('Please enter both Game Name and Tag Line');
        return;
      }
  
      setLoading(true);
      setError('');
      setMatches([]);
      setPlacements([]);
      setAvgRank(null);
      setWins(null);
      setTop4s(null);
      setRankedWins(null);
      setRankedLosses(null);
      setRank('');
      setLeaguePoints(null);
  
      try {
        // Fetch both match history and rank data using the optimized endpoint
        console.log(`Fetching TFT data for: ${gameName}#${tagLine}`);
        const tftDataResponse = await fetch(
          `https://riot-tft.leiwuhoo.workers.dev/get-tft-data?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
        );

        console.log(`TFT data response status: ${tftDataResponse.status}`);
        console.log(`TFT data response headers:`, Object.fromEntries(tftDataResponse.headers.entries()));
        
        let tftData;
        if (!tftDataResponse.ok) {
          console.log(`TFT data response not OK: ${tftDataResponse.status}`);
          const errorText = await tftDataResponse.text();
          console.log('Error response text:', errorText);
          
          if (tftDataResponse.status === 404) {
            // Player is unranked or not found, set as unranked
            console.log('Setting player as unranked (404)');
            setRank('Unranked');
            setLeaguePoints(0);
            setRankedWins(0);
            setRankedLosses(0);
            return;
          } else if (tftDataResponse.status >= 500) {
            // Server error - show user-friendly message
            console.error(`Server error: ${tftDataResponse.status}`);
            setRank('Unranked');
            setLeaguePoints(0);
            setRankedWins(0);
            setRankedLosses(0);
            console.log('Set as unranked due to server error');
            return;
          } else {
            // Try to get the error message from JSON response
            try {
              const errorData = JSON.parse(errorText);
              console.error('TFT API error:', errorData);
              throw new Error(errorData.error || `Failed to fetch TFT data (${tftDataResponse.status})`);
            } catch (parseError) {
              console.error('Error parsing TFT error response:', parseError);
              throw new Error(`Failed to fetch TFT data (${tftDataResponse.status}): ${errorText}`);
            }
          }
        } else {
          tftData = await tftDataResponse.json();
          console.log('✅ Received TFT data:', tftData);
          console.log('✅ Data type:', typeof tftData, 'Keys:', Object.keys(tftData || {}));
        }


  
        // Parse the new combined TFT data structure
        if (tftData && tftData.rankData && Array.isArray(tftData.rankData) && tftData.rankData.length > 0) {
            const rankedEntry = tftData.rankData[0]; // Access the first ranked entry
            console.log('✅ Using ranked entry:', rankedEntry);
            console.log('✅ Entry fields:', Object.keys(rankedEntry));
            
            // Set rank data from the new structure
            if (rankedEntry.tier && rankedEntry.rank) {
              const rankString = `${rankedEntry.tier} ${rankedEntry.rank}`;
              console.log('✅ Setting rank:', rankString);
              console.log('✅ Setting LP:', rankedEntry.leaguePoints);
              console.log('✅ Setting wins:', rankedEntry.wins);
              console.log('✅ Setting losses:', rankedEntry.losses);
              
              setRank(rankString);
              setLeaguePoints(rankedEntry.leaguePoints || 0);
              setRankedWins(rankedEntry.wins || 0);
              setRankedLosses(rankedEntry.losses || 0);
              
              console.log('✅ State should be updated now');
            } else {
              console.log('⚠️ Missing tier or rank field');
              setRank('Unranked');
              setLeaguePoints(0);
              setRankedWins(0);
              setRankedLosses(0);
            }
        } 
        else {
            console.log('❌ No ranked data found in combined response');
            console.log('❌ tftData:', tftData);
            console.log('❌ rankData exists:', !!tftData?.rankData);
            console.log('❌ rankData isArray:', Array.isArray(tftData?.rankData));
            console.log('❌ rankData length:', tftData?.rankData?.length);
            setRank('Unranked');
            setLeaguePoints(0);
            setRankedWins(0);
            setRankedLosses(0);
        }

        // Process match history from the new structure 
        if (tftData && tftData.matchHistory && Array.isArray(tftData.matchHistory)) {
            console.log('✅ Processing match history from combined response:', tftData.matchHistory.length, 'matches');
            
            // Set the raw matches data for display
            const recentMatches = tftData.matchHistory.slice(0, 10);
            setMatches(recentMatches);
            
            // Extract placements for this player
            const userPlacements = [];
            for (const match of tftData.matchHistory) {
                const userParticipant = match.info.participants.find(
                    p => p.riotIdGameName?.toLowerCase() === gameName.toLowerCase() && 
                         p.riotIdTagline?.toLowerCase() === tagLine.toLowerCase()
                );
                if (userParticipant) {
                    userPlacements.push(userParticipant.placement);
                }
            }
            
            if (userPlacements.length > 0) {
                setPlacements(userPlacements);
                const totalGames = userPlacements.length;
                const sumOfRanks = userPlacements.reduce((sum, p) => sum + p, 0);
                setAvgRank((sumOfRanks / totalGames).toFixed(1));
                setWins(userPlacements.filter(p => p === 1).length);
                setTop4s(userPlacements.filter(p => p <= 4).length);
                console.log('✅ Updated match history stats from combined response');
            }
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

          {/* Debug info */}
          {console.log('Rank Display Debug:', { rank, leaguePoints, rankedWins, rankedLosses })}

          {(rank && rank !== '' && leaguePoints !== null) && (
            <RankContainer>
              <RankHeader>
                <img src={require('../../images/tfts15.avif')} alt="Rank Emblem" />
                <div>
                  <h2>{rank} {leaguePoints} LP</h2>
                  <p>TFT Set 15</p>
                </div>
              </RankHeader>
              <StatsGrid>
                <StatItem>
                  <div className="label">
                    <span>Ranked Wins</span>
                  </div>
                  <div className="value">{rankedWins}</div>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${rankedWins && rankedLosses ? (rankedWins / (rankedWins + rankedLosses)) * 100 : 0}%`}}></div>
                  </div>
                  <div className="label">
                    <span>Ranked Win Rate</span>
                  </div>
                  <div className="value">{rankedWins && rankedLosses ? ((rankedWins / (rankedWins + rankedLosses)) * 100).toFixed(1) : 0}%</div>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${rankedWins && rankedLosses ? (rankedWins / (rankedWins + rankedLosses)) * 100 : 0}%`}}></div>
                  </div>
                </StatItem>
                <StatItem>
                  <div className="label">
                    <span>Ranked Losses</span>
                  </div>
                  <div className="value">{rankedLosses}</div>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${rankedWins && rankedLosses ? (rankedLosses / (rankedWins + rankedLosses)) * 100 : 0}%`}}></div>
                  </div>
                  <div className="label">
                    <span>Total Ranked Games</span>
                  </div>
                  <div className="value">{rankedWins && rankedLosses ? rankedWins + rankedLosses : 0}</div>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${Math.min(100, ((rankedWins + rankedLosses) / 50) * 100)}%`}}></div>
                  </div>
                </StatItem>
                <StatItem>
                  <div className="label">
                    <span>Recent Games</span>
                  </div>
                  <div className="value">{placements.length}</div>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${Math.min(100, (placements.length / 10) * 100)}%`}}></div>
                  </div>
                  <div className="label">
                    <span>Recent Avg. Rank</span>
                  </div>
                  <div className="value">#{avgRank || 'N/A'}</div>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${avgRank ? 100 - ((avgRank - 1) / 7 * 100) : 0}%`}}></div>
                  </div>
                </StatItem>
              </StatsGrid>
            </RankContainer>
          )}
  
          {matches.length > 0 && (
            <RecentGamesContainer>
              <RecentGamesHeader>Recent 10 Games (Ranked)</RecentGamesHeader>
              <StatsAndGridContainer>
                <StatsContainer>
                  <StatBox>
                    <p>Avg. Rank</p>
                    <h3>#{avgRank}</h3>
                  </StatBox>
                  <StatBox>
                    <p>Wins</p>
                    <h3>{wins}</h3>
                  </StatBox>
                  <StatBox>
                    <p>TOP</p>
                    <h3>{top4s}</h3>
                  </StatBox>
                </StatsContainer>
                <HistoryGrid>
                  {placements.map((placement, i) => (
                    <PlacementBox key={i} placement={placement}>
                      {placement}
                    </PlacementBox>
                  ))}
                  {Array.from({ length: 10 - placements.length }).map((_, i) => (
                    <PlacementBox key={`empty-${i}`} placement='-'>
                      -
                    </PlacementBox>
                  ))}
                </HistoryGrid>
              </StatsAndGridContainer>
            </RecentGamesContainer>
          )}

          {matches.length > 0 && (
            <DetailedHistoryContainer>
              {matches.map((match, index) => {
                const participant = match.info.participants.find(
                  p => p.riotIdGameName.toLowerCase() === gameName.toLowerCase() &&
                       p.riotIdTagline.toLowerCase() === tagLine.toLowerCase()
                );
                const placement = participant ? participant.placement : 'N/A';
                return (
                  <DetailedMatchRow key={index}>
                    <div>
                      <h4>Match {index + 1}</h4>
                      <p>Date: {new Date(match.info.game_datetime).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p>Game Length: {Math.floor(match.info.game_length / 60)} minutes</p>
                    </div>
                    {placement !== 'N/A' && (
                      <PlacementPill placement={placement}>
                        #{placement}
                      </PlacementPill>
                    )}
                  </DetailedMatchRow>
                );
              })}
            </DetailedHistoryContainer>
          )}
        </Layout>
      </>
    );
  }
  
  export default Tft;