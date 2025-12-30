# Deploying SyncLane on Render

SyncLane uses MongoDB for data persistence. You must configure the `MONGO_URI` environment variable on Render.

## Quick Start Commands

-   **Build Command:** `npm install && npm run build && cd server && npm install`
-   **Start Command:** `cd server && npm start`

## Step-by-Step Deployment Guide

1.  **Create a New Web Service** on [Render](https://dashboard.render.com/).
2.  **Connect your repository**.
3.  **Settings:**
    -   **Name:** `synclane` (or your choice)
    -   **Runtime:** `Node`
    -   **Build Command:** `npm install && npm run build && cd server && npm install`
    -   **Start Command:** `cd server && npm start`
4.  **Environment Variables:**
    -   `MONGO_URI`: `mongodb+srv://sudhanshu:kt@2311@cluster0.v9pursh.mongodb.net/?appName=Cluster0` (Or your own MongoDB connection string).
    -   `API_KEY`: (Optional) Your Google Gemini API Key.

5.  **Deploy!**
    -   Render will automatically pick up the changes and deploy.
