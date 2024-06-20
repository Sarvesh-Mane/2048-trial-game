const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sarit@0526',
  database: '2048game'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API endpoint to get high scores
app.get('/highscores', (req, res) => {
  connection.query('SELECT * FROM scores ORDER BY score DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API endpoint to save high score
app.post('/highscore', (req, res) => {
  const { name, score } = req.body;
  connection.query('INSERT INTO scores (name, score) VALUES (?, ?)', [name, score], (err, results) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
