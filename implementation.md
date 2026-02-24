Project Setup Plan
This plan outlines the steps to set up the Polymarket Intelligence project for local development.

User Review Required
IMPORTANT

You will need to provide the following API keys in the .env file:

NEWS_API_KEY (from https://newsapi.org)
GEMINI_API_KEY (from Google AI Studio)
TAVILY_API_KEY (from https://tavily.com)
POLYMARKET_API_KEY, POLYMARKET_SECRET, POLYMARKET_PASSPHRASE (if you intend to use trading features, otherwise placeholders might suffice for now)
Proposed Changes
Configuration
[MODIFY] 
.env
Update placeholders with actual API keys provided by the user.
Dependencies
Backend
Run uv sync to install Python dependencies.
Frontend
Run npm install in src/frontend to install Node.js dependencies.
Verification Plan
Automated Tests
Run pytest to ensure backend components are working correctly (if tests exist).
Run npm run dev for the frontend and check for build errors.
Manual Verification
Start the backend server using ./scripts/start_backend.sh.
Start the frontend server using ./scripts/start_frontend.sh.
Verify the dashboard loads at http://localhost:5173.
Check if the news feed and market data are being fetched correctly (requires valid API keys).