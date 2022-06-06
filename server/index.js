require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));
app.use(express.json());

// app.get('/api/hello', (req, res) => {
//   res.json({ hello: 'world' });
// });

// app.get('api/meeting/:')
// get app.get request to make the table for the meeting page

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
