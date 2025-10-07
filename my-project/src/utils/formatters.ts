export const formatters = {
  distance(meters: number): string {
    return `${(meters / 1000).toFixed(2)} km`;
  },

  time(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  },

  speed(metersPerSecond: number): string {
    const kmh = metersPerSecond * 3.6;
    return `${kmh.toFixed(1)} km/h`;
  },

  date(dateString: string): string {
    return new Date(dateString)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toLowerCase();
  },

  heartRate(bpm: number): string {
    return `${Math.round(bpm)} bpm`;
  },

  elevation(meters: number): string {
    return `↗ ${Math.round(meters)}m`;
  },
};

export const getActivityTypeColor = (activityType?: string): string => {
  switch (activityType?.toLowerCase()) {
    case "run":
    case "running":
      return "#e74c3c";
    case "ride":
    case "cycling":
    case "bike":
      return "#3498db";
    case "swim":
    case "swimming":
      return "#1abc9c";
    case "walk":
    case "walking":
      return "#95a5a6";
    case "hike":
    case "hiking":
      return "#27ae60";
    case "workout":
    case "crossfit":
    case "weightlifting":
      return "#8e44ad";
    case "yoga":
      return "#f39c12";
    default:
      return "#fc4c02";
  }
};

export const API_ENDPOINTS = {
  STRAVA_BASE: "https://strava-worker.leiwuhoo.workers.dev",
  STRAVA_MONTHLY: "https://strava-worker.leiwuhoo.workers.dev/activities-by-month",
} as const;

