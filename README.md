# EcoTrack - AI-Powered Carbon Footprint Tracker


## Project Overview
EcoTrack is an advanced AI-powered platform designed to help users monitor, manage, and reduce their carbon footprint. By leveraging AI-driven insights, gamification, and blockchain technology, it provides users with personalized strategies to adopt sustainable practices. The system is built with a modular architecture comprising three main components:

- **Frontend**: A React-based user interface for inputting data, tracking progress, and engaging with gamified sustainability challenges.
- **Backend**: A Node.js and Express.js server managing user authentication, API communication, and data storage.
- **AI Engine**: A dedicated module using the Google Gemini API to analyze user activity and provide tailored sustainability recommendations.
- **Database**: Firebase Firestore is used to store user data, sustainability progress, and gamification points securely.


## Key Features

### 1. Carbon Footprint Tracker
- Allows users to input daily activities, including transportation, energy consumption, and food habits.
- AI-based calculation of carbon footprint with category-wise breakdown.
- Tracks historical data and trends for informed decision-making.

### 2. AI-Based Personalized Sustainability Plan
- Generates tailored sustainability plans based on user habits.
- AI suggests specific actions to reduce carbon emissions.
- Progress tracking with real-time analytics and insights.

### 3. Gamification & Leaderboards
- Users complete sustainability challenges and daily tasks.
- Earn points, unlock achievements, and rank on leaderboards.
- Encourages eco-friendly habits through interactive engagement.

### 4. Carbon Credit & Offsetting Marketplace
- Provides a transparent system for investing in carbon offset projects.
- Blockchain-based verification of carbon credits.
- Real-time tracking of investments and their environmental impact.

### 5. 3D Earth Model
- A real-time interactive 3D model of Earth displaying global climate conditions.
- Marks locations of natural disasters and environmental risks.
- Provides visual data on climate trends and emissions.

### 6. Weather Updates
- Fetches and displays weather data based on user location.
- Provides insights into climate conditions for better decision-making.

### 7. Dark/Light Mode Toggle
- Users can switch between light and dark modes.
- Enhances accessibility and readability under different conditions.


## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Firebase Firestore
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **AI Engine**: Google Gemini API
- **Blockchain**: Smart contracts for carbon credits
- **3D Visualization**: Three.js / WebGL


## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/ecotrack.git
cd ecotrack
```

### 2. Install Dependencies
Navigate to each directory and install dependencies.

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

#### AI Engine
```bash
cd ../ai-engine
pip install -r requirements.txt
```

### 3. Setup Environment Variables
The project requires environment variables for API keys and other configurations. Create the following `.env` files:

#### Folder Structure for .env Files
```
/ecotrack
│── ai-engine
│   ├── app.py
│── backend
│   ├── index.js
│── frontend
│   ├── .env  # Separate env file
│   ├── src
├── .env  # Common for ai-engine and backend
│── .gitignore
│── README.md
```

#### Common .env for Backend and AI Engine
Create a single `.env` file in the root directory (`/ecotrack/.env`) to be used by both `backend` and `ai-engine`.

```env
DATABASE_URL=your_database_url_here
GEMINI_API_KEY=your_api_key_here
WEATHER_API_KEY=your_api_key_here
BLOCKCHAIN_API_KEY=your_api_key_here
```

#### Frontend .env File
Create a `.env` file inside the `frontend` directory.

```env
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
FIREBASE_PROJECT_ID=your_firebase_project_id_here
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
FIREBASE_APP_ID=your_firebase_app_id_here
```

### 4. Firebase Firestore Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project and enable Firestore Database.
3. Set up authentication methods (email/password, Google, etc.).
4. Get the Firebase config details and add them to the `frontend/.env` file.

### 5. Run the Application
Start each module separately.

#### Start Backend Server
```bash
cd backend
nodemon index.js
```

#### Start AI Engine
```bash
cd ../ai-engine
python app.py
```

#### Start Frontend
```bash
cd ../frontend
npm run dev
```

### 6. Access the Application
Once all services are running:
- Open the frontend in a browser at `http://localhost:<your_port>` .
- The backend server should be running on `http://localhost:<your_port>` .
- The AI engine processes requests in real-time.


## Development Note
This project is still in the development stage. Various parts of the code are currently hardcoded, meaning fixed values are used instead of fetching actual data from the backend. Additionally, several functionalities are yet to be implemented. Future updates will focus on improving dynamic data handling and completing the remaining features.


## Contributing
We welcome contributions! Feel free to submit issues or pull requests.

## License
This project is licensed under the MIT License.

---
Empowering sustainability through AI and innovation.
