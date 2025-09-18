import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { 
  LoadingText, 
  SkeletonLoader, 
  SkeletonCard 
} from '../../Components/SharedStyledComponents';
import { formatters, getActivityTypeColor, API_ENDPOINTS } from '../../utils/formatters';

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

const StatsContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #fc4c02;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActivitiesContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  min-height: 400px;
`;

const ActivityCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ActivityName = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  margin: 0;
  color: #333;
`;

const ActivityLink = styled.a`
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    color: #fc4c02;
    text-decoration: underline;
  }
  
  svg {
    font-size: 1rem;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  &:hover svg {
    opacity: 1;
  }
`;

const ActivityDetails = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

// Utility function moved to utils/formatters.js

const ActivityType = styled.span`
  background: ${props => props.color || '#fc4c02'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

// SkeletonLoader and SkeletonCard moved to SharedStyledComponents.js

const YearSection = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const YearHeading = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 2.5rem;
  color: #fc4c02;
  text-align: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MonthCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.isSelected ? '3px solid #fc4c02' : '3px solid transparent'};
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const MonthName = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MonthStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const MonthStat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fc4c02;
`;

const MonthStatLabel = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ExpandedActivities = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

const MonthActivitiesHeading = styled.h4`
  font-family: "Inter", sans-serif;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
`;

// LoadingText moved to SharedStyledComponents.js

function Strava() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthActivities, setSelectedMonthActivities] = useState([]);
  const [currentMonthStats, setCurrentMonthStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMonth, setLoadingMonth] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        // Fetch monthly data
        const monthlyResponse = await fetch(API_ENDPOINTS.STRAVA_MONTHLY);
        const monthlyResponseData = await monthlyResponse.json();
        
        if (monthlyResponseData.error) {
          setError(monthlyResponseData.error);
          setLoading(false);
          return;
        }
        
        const months = monthlyResponseData.months || [];
        setMonthlyData(months);
        
        // Get current month (YYYY-MM format)
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        // Find current month's data
        const currentMonthData = months.find(month => month.month === currentMonth);
        
        if (currentMonthData) {
          // Fetch detailed activities for current month to calculate heart rate
          try {
            const currentMonthActivitiesResponse = await fetch(`${API_ENDPOINTS.STRAVA_BASE}/activities-by-month?month=${currentMonth}`);
            const currentMonthActivitiesData = await currentMonthActivitiesResponse.json();
            
            if (!currentMonthActivitiesData.error && currentMonthActivitiesData.activities) {
              // Calculate average and max heart rate from activities that have heart rate data
              const activitiesWithAvgHR = currentMonthActivitiesData.activities.filter(activity => activity.average_heartrate);
              const activitiesWithMaxHR = currentMonthActivitiesData.activities.filter(activity => activity.max_heartrate);
              
              const avgHeartRate = activitiesWithAvgHR.length > 0 
                ? Math.round(activitiesWithAvgHR.reduce((sum, activity) => sum + activity.average_heartrate, 0) / activitiesWithAvgHR.length)
                : 0;
              
              const maxHeartRate = activitiesWithMaxHR.length > 0 
                ? Math.max(...activitiesWithMaxHR.map(activity => activity.max_heartrate))
                : 0;
              
              setCurrentMonthStats({
                ...currentMonthData,
                averageHeartRate: avgHeartRate,
                maxHeartRate: maxHeartRate,
                activitiesWithHR: activitiesWithAvgHR.length
              });
            } else {
              setCurrentMonthStats(currentMonthData);
            }
          } catch (error) {
            console.error('Error fetching current month activities for HR:', error);
            setCurrentMonthStats(currentMonthData);
          }
        } else {
          // If no current month data, create empty stats
          setCurrentMonthStats({
            month: currentMonth,
            monthName: now.toLocaleString('default', { month: 'long' }),
            year: now.getFullYear().toString(),
            activityCount: 0,
            totalDistance: 0,
            totalTime: 0,
            averageHeartRate: 0,
            maxHeartRate: 0,
            activitiesWithHR: 0
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Strava data:', error);
        setError('Error fetching activity data');
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleMonthClick = async (month) => {
    if (selectedMonth === month.month) {
      setSelectedMonth(null);
      setSelectedMonthActivities([]);
      return;
    }

    setLoadingMonth(true);
    setSelectedMonth(month.month);
    
    try {
      const response = await fetch(`${API_ENDPOINTS.STRAVA_BASE}/activities-by-month?month=${month.month}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setSelectedMonthActivities([]);
      } else {
        setSelectedMonthActivities(data.activities || []);
      }
    } catch (error) {
      console.error('Error fetching month activities:', error);
      setError('Error fetching month data');
      setSelectedMonthActivities([]);
    }
    
    setLoadingMonth(false);
  };

  // Formatting functions moved to utils/formatters.js

  // Group months by year
  const monthsByYear = monthlyData.reduce((acc, month) => {
    const year = month.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(month);
    return acc;
  }, {});

  // Sort years (most recent first)
  const sortedYears = Object.keys(monthsByYear).sort((a, b) => b - a);

  return (
    <Layout>
        <HeadingContainer>
          <Heading>strava activities</Heading>
        </HeadingContainer>
        
        {currentMonthStats && !loading && (
          <>
            <HeadingContainer>
              <Heading style={{ fontSize: '2rem', marginBottom: '10px' }}>
                {currentMonthStats.monthName.toLowerCase()} {currentMonthStats.year}
              </Heading>
            </HeadingContainer>
            <StatsContainer>
              <StatCard>
                <StatValue>{currentMonthStats.activityCount}</StatValue>
                <StatLabel>Activities This Month</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{formatters.distance(currentMonthStats.totalDistance)}</StatValue>
                <StatLabel>Distance This Month</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{formatters.time(currentMonthStats.totalTime)}</StatValue>
                <StatLabel>Time This Month</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{currentMonthStats.averageHeartRate > 0 ? currentMonthStats.averageHeartRate + ' bpm' : 'No HR data'}</StatValue>
                <StatLabel>Avg Heart Rate</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{currentMonthStats.maxHeartRate > 0 ? currentMonthStats.maxHeartRate + ' bpm' : 'No HR data'}</StatValue>
                <StatLabel>Max Heart Rate</StatLabel>
              </StatCard>
            </StatsContainer>
          </>
        )}
        
        <ActivitiesContainer>
          {loading ? (
            <SkeletonLoader>
              {[...Array(5)].map((notUsed, i) => (
                <SkeletonCard key={i} />
              ))}
            </SkeletonLoader>
          ) : error ? (
            <p>Error: {error}</p>
          ) : monthlyData.length > 0 ? (
            sortedYears.map((year) => (
              <YearSection key={year}>
                <YearHeading>{year}</YearHeading>
                <MonthsGrid>
                  {monthsByYear[year].map((month) => (
                    <MonthCard 
                      key={month.month} 
                      isSelected={selectedMonth === month.month}
                      onClick={() => handleMonthClick(month)}
                    >
                      <MonthName>
                        {month.monthName.toLowerCase()}
                        <span style={{ fontSize: '0.8rem', color: '#fc4c02' }}>
                          {month.activityCount} activities
                        </span>
                      </MonthName>
                      <MonthStats>
                        <MonthStat>
                          <StatNumber>{formatters.distance(month.totalDistance)}</StatNumber>
                          <MonthStatLabel>Distance</MonthStatLabel>
                        </MonthStat>
                        <MonthStat>
                          <StatNumber>{formatters.time(month.totalTime)}</StatNumber>
                          <MonthStatLabel>Time</MonthStatLabel>
                        </MonthStat>
                        <MonthStat>
                          <StatNumber>{month.activityCount}</StatNumber>
                          <MonthStatLabel>Activities</MonthStatLabel>
                        </MonthStat>
                      </MonthStats>
                    </MonthCard>
                  ))}
                </MonthsGrid>
                
                {selectedMonth && monthsByYear[year].find(m => m.month === selectedMonth) && (
                  <ExpandedActivities>
                    <MonthActivitiesHeading>
                      {monthsByYear[year].find(m => m.month === selectedMonth)?.monthName.toLowerCase()} {year} activities
                    </MonthActivitiesHeading>
                    
                    {loadingMonth ? (
                      <LoadingText>Loading activities...</LoadingText>
                    ) : selectedMonthActivities.length > 0 ? (
                      selectedMonthActivities.map((activity) => (
                        <ActivityCard key={activity.id}>
                          <ActivityInfo>
                            <ActivityName>
                              <ActivityLink 
                                href={`https://www.strava.com/activities/${activity.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {activity.name}
                                <OpenInNewIcon />
                              </ActivityLink>
                            </ActivityName>
                            <ActivityDetails>
                              <span>{formatters.date(activity.start_date)}</span>
                              <span>{formatters.distance(activity.distance)}</span>
                              <span>{formatters.time(activity.moving_time)}</span>
                              {activity.average_speed && (
                                <span>{formatters.speed(activity.average_speed)}</span>
                              )}
                              {activity.total_elevation_gain > 0 && (
                                <span>{formatters.elevation(activity.total_elevation_gain)}</span>
                              )}
                              {activity.average_heartrate && (
                                <span>💓 {formatters.heartRate(activity.average_heartrate)} avg</span>
                              )}
                              {activity.max_heartrate && (
                                <span>❤️ {formatters.heartRate(activity.max_heartrate)} max</span>
                              )}
                            </ActivityDetails>
                          </ActivityInfo>
                          <ActivityType color={getActivityTypeColor(activity.type)}>{activity.type}</ActivityType>
                        </ActivityCard>
                      ))
                    ) : (
                      <LoadingText>No activities found for this month.</LoadingText>
                    )}
                  </ExpandedActivities>
                )}
              </YearSection>
            ))
          ) : (
            <p>No monthly data available yet. Data will be populated after the next weekly sync.</p>
          )}
        </ActivitiesContainer>
      </Layout>
  );
}

export default Strava;
