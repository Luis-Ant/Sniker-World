import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin1',
  database: process.env.DB_DATABASE || 'ecommerce_sneakers',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    const result = await client.query('SELECT * FROM sneakers LIMIT 1');
    console.log('Test query result:', result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
  } finally {
    await pool.end();
  }
}

testConnection();