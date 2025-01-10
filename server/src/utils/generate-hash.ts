// server/src/utils/generate-hash.ts
import bcrypt from 'bcryptjs';

async function generateHash() {
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log({
    password,
    hash
  });
}

generateHash();