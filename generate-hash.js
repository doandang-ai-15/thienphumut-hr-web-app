// Generate bcrypt hash for password123
const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nCopy hash này vào neon-seed.sql');
}

generateHash();
