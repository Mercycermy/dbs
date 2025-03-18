// filepath: c:\Users\Administrator\Downloads\dbs\generateHash.js
import bcrypt from 'bcrypt';

const password = 'hurryup2morrow'; // Replace with your new password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
