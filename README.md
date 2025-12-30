# SyncLane

SyncLane is a multiplayer productivity workspace that blends high-performance Kanban with deep RPG mechanics.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI:** Google Gemini

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    cd server && npm install
    ```

2.  **Environment Setup:**
    -   Create `server/.env` and add your MongoDB connection string and Google API Key (optional):
        ```env
        MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=Cluster0
        API_KEY=your_gemini_api_key
        ```
    -   If `MONGO_URI` is omitted, the app will use an in-memory MongoDB instance (data will be lost on restart).
    -   If `API_KEY` is omitted, AI features will be disabled/mocked.

3.  **Run the Application:**
    ```bash
    npm run dev
    ```
    This will start both the backend (port 3000) and the frontend (port 3001) concurrently.

4.  **Build:**
    ```bash
    npm run build
    ```

## Features

-   **Multiplayer Kanban:** Real-time task management.
-   **RPG Progression:** Earn XP, level up, and maintain streaks.
-   **Clans:** Team-based productivity.
-   **AI Assistance:** Smart task suggestions and description enhancements.
