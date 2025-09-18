// Utility functions for formatting data across components

export const formatters = {
  distance: (meters) => `${(meters / 1000).toFixed(2)} km`,
  
  time: (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  },
  
  speed: (metersPerSecond) => {
    const kmh = metersPerSecond * 3.6;
    return `${kmh.toFixed(1)} km/h`;
  },
  
  date: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toLowerCase();
  },
  
  heartRate: (bpm) => `${Math.round(bpm)} bpm`,
  
  elevation: (meters) => `↗ ${Math.round(meters)}m`
};

export const getActivityTypeColor = (activityType) => {
  switch (activityType?.toLowerCase()) {
    case 'run':
    case 'running':
      return '#e74c3c'; // Red for running
    case 'ride':
    case 'cycling':
    case 'bike':
      return '#3498db'; // Blue for cycling
    case 'swim':
    case 'swimming':
      return '#1abc9c'; // Teal for swimming
    case 'walk':
    case 'walking':
      return '#95a5a6'; // Gray for walking
    case 'hike':
    case 'hiking':
      return '#27ae60'; // Green for hiking
    case 'workout':
    case 'crossfit':
    case 'weightlifting':
      return '#8e44ad'; // Purple for gym workouts
    case 'yoga':
      return '#f39c12'; // Orange for yoga
    default:
      return '#fc4c02'; // Default Strava orange
  }
};

export const API_ENDPOINTS = {
  STRAVA_BASE: 'https://strava-worker.leiwuhoo.workers.dev',
  STRAVA_MONTHLY: 'https://strava-worker.leiwuhoo.workers.dev/activities-by-month'
};
