# ArtHalimi Analytics Backend

This is a Node.js + Express + MySQL backend for portfolio analytics.

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**

   - Copy `.env.example` to `.env` and fill in your MySQL credentials.

3. **Create the database and table:**

   - Create a MySQL database named `arthalimi_analytics` (or your chosen name).
   - Run the schema:
     ```sh
     mysql -u <user> -p < arthalimiPortfolio-Latest/backend/schema.sql
     ```

4. **Start the server:**
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/visit` — Record a new visit
  - Body: `{ country, timestamp, page }`
- `GET /api/visits` — Get all visit records

CORS is enabled for `arthalimi.com` and localhost.

---

**Deploy:**

- Ready for Render, Vercel, or any Node.js host.
- Set environment variables in your deployment dashboard.
