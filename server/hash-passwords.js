const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwords = ['password123', 'password123', 'password123', 'password123'];

passwords.forEach((password) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Hashed password: ${hash}`);
    }
  });
});
