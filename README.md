# SyncLane

SyncLane is a multiplayer productivity workspace that blends high-performance Kanban with deep RPG mechanics.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express, SQLite (Sequelize)
- **AI:** Google Gemini

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    cd server && npm install
    ```

2.  **Environment Setup:**
    -   Create `server/.env` and add your Google API Key (optional):
        ```env
        API_KEY=your_gemini_api_key
        ```
    -   **Database:** The application uses SQLite. A `database.sqlite` file will be automatically created in the `server/` directory upon the first start. Data persists locally in this file.
    -   If `API_KEY` is omitted, AI features will be disabled/mocked.

3.  **Run the Application:**
    ```bash
    npm run dev
    ```
    This will start both the backend (port 3000) and the frontend (port 5173 or similar) concurrently.

4.  **Build:**
    ```bash
    npm run build
    ```

## Features

-   **Multiplayer Kanban:** Real-time task management.
-   **RPG Progression:** Earn XP, level up, and maintain streaks.
-   **Clans:** Team-based productivity.
-   **AI Assistance:** Smart task suggestions and description enhancements.
