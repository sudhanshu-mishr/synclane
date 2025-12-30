# Deploying SyncLane on Render

SyncLane uses a SQLite database. To ensure your data isn't deleted every time the server restarts or deploys, you must configure a **Persistent Disk** on Render.

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
    -   `DB_PATH`: `/data/database.sqlite` (Required for persistence).
    -   `API_KEY`: (Optional) Your Google Gemini API Key. If omitted, AI features will be disabled.

5.  **Add a Persistent Disk (CRITICAL)**
    -   Go to the **Disks** tab in your service dashboard.
    -   Click **Add Disk**.
    -   **Name:** `sqlite-data`
    -   **Mount Path:** `/data`
    -   **Size:** 1 GB (Minimum is fine).

    *Why?* Render's file system is ephemeral. If you don't mount a disk and save your database there, `database.sqlite` will be wiped on every deploy.

6.  **Deploy!**
