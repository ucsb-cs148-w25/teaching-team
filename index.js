// Import the express framework and pg (PostgreSQL client)
const express = require('express');
const { Client } = require('pg');

// Create an instance of express
const app = express();

// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;

// PostgreSQL connection configuration
const client = new Client({
  user: process.env.DB_USER || 'postgres',       // Database user
  host: process.env.DB_HOST || 'dokku-postgres-playground-db',       // Database host
  database: process.env.DB_NAME || 'playground-db',   // Database name
  password: process.env.DB_PASSWORD || '', // Database password
  port: process.env.DB_PORT || 5432,                 // Database port
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Define a route for the root URL ("/")
app.get('/', async (req, res) => {
  try {
    // Query the database to fetch all rows from the vegetables table
    const result = await client.query('SELECT * FROM vegetables');

    // Send the data as a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data', err.stack);
    res.status(500).send('Error fetching data');
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
