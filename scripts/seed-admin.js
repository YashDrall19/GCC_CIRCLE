// Script to create the first admin user
// Run with: node scripts/seed-admin.js

const fetch = require('node-fetch');

async function seedAdmin() {
  const response = await fetch('http://localhost:3000/api/admin/seed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@gcccircle.com',
      password: 'admin123',
      name: 'Admin User',
      secret: 'gcc-circle-admin-2024',
    }),
  });

  const data = await response.json();
  console.log(data);
}

seedAdmin();
