# Playground Backend

This directory contains all backend services, APIs, workers, and demos that power the playground features of the main website.

## 📁 Directory Structure

```
playground-backend/
├── apis/           # Backend API services
├── workers/        # Cloudflare Workers
├── demos/          # Demo applications
├── docs/           # Documentation
└── README.md       # This file
```

## 🔧 APIs

### Spotify API (`apis/spotify-api/`)
- **Language**: Python
- **Purpose**: Fetches current playing track and user data from Spotify API
- **Files**:
  - `main.py` - Main API server
  - `trackapi.py` - Spotify API integration
  - `requirements.txt` - Python dependencies
  - `README-env.md` - Environment setup instructions

### Usage
```bash
cd apis/spotify-api/
pip install -r requirements.txt
python main.py
```

## ⚡ Cloudflare Workers (`workers/`)

### Strava Worker (`strava-worker.js`)
- **Purpose**: Fetches and caches Strava activity data
- **Endpoints**: 
  - `/activities-by-month` - Monthly activity summaries
  - `/activities-by-month?month=YYYY-MM` - Specific month activities
- **Deployment**: Uses `wrangler.toml` configuration

### TFT Workers
- **`tft-worker.js`** - Original TFT match history worker
- **`tft-worker-optimized.js`** - Optimized version with better caching
- **Purpose**: Fetches Teamfight Tactics match history from Riot Games API

### Deployment
```bash
cd workers/
npx wrangler deploy strava-worker.js
npx wrangler deploy tft-worker-optimized.js
```

## 🎮 Demos (`demos/`)

### Spotify Profile Demo (`demos/spotify-profile-demo/`)
- **Language**: TypeScript/Vite
- **Purpose**: Demo application for Spotify profile integration
- **Tech Stack**: Vite, TypeScript, vanilla JS

### Usage
```bash
cd demos/spotify-profile-demo/
npm install
npm run dev
```

## 📚 Documentation (`docs/`)

- **`STRAVA_SETUP.md`** - Complete setup guide for Strava API integration and worker deployment

## 🔗 Frontend Integration

The main React app (`my-project/src/pages/Playground/`) connects to these backend services:

- **Strava.js** → `strava-worker.js`
- **Music.js** → `spotify-api/`
- **Tft.js** → `tft-worker-optimized.js`

## 🚀 Quick Start

1. **Set up APIs**: Follow individual README files in each API directory
2. **Deploy Workers**: Use Wrangler CLI to deploy Cloudflare Workers
3. **Configure Environment**: Update environment variables in respective services
4. **Test Integration**: Verify frontend components can connect to backend services

## 🔧 Configuration

Each service has its own configuration requirements:
- **Spotify API**: Requires Spotify API credentials
- **Strava Worker**: Requires Strava API access token
- **TFT Worker**: Requires Riot Games API key

Refer to individual service documentation for detailed setup instructions.

## 📝 Notes

- All workers are configured for production deployment on Cloudflare
- API services can be hosted on any platform supporting their respective runtimes
- Demo applications are for development and testing purposes

## 🔍 Troubleshooting

If you encounter issues:
1. Check individual service README files
2. Verify API credentials and environment variables
3. Check CORS configuration for cross-origin requests
4. Review Cloudflare Worker logs for deployment issues
