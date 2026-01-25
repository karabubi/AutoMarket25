
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/utils/db.js
const { Pool } = require("pg");

const isProd = process.env.NODE_ENV === "production";

let pool;

// ✅ Production (Render/Supabase)
if (isProd && process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}
// ✅ Local development (localhost Postgres)
else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: false,
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};
