import mysql2 from 'mysql2';

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Ensure the password is correct
  database: 'blogproj',
  connectTimeout: 10000 // Increase timeout to 10 seconds
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

export default db;
