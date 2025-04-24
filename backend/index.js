import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin1',
  database: process.env.DB_DATABASE || 'ecommerce_sneakers',
  port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.json());

app.get('/api/sneakers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sneakers');
    const sneakers = result.rows.map((sneaker) => {
      if (sneaker.imagen_snkr) {
        sneaker.imagen_snkr = sneaker.imagen_snkr.toString('base64');
      }
      return sneaker;
    });
    res.json(sneakers);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Error fetching sneakers' });
  }
} );

app.get('/api/sneakers/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sneakers WHERE id_snkr = $1', [req.params.id]);
    const sneaker = result.rows[0];
    if (sneaker.imagen_snkr) {
      sneaker.imagen_snkr = sneaker.imagen_snkr.toString('base64');
    }
    res.json(sneaker);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Error fetching sneaker' });
  }
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
