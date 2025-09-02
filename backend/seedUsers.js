require('dotenv').config();
const mongoose = require('./db');
const { User } = require('./models/User');

const roles = [
  'Campaign Manager',
  'Candidate',
  'Data Analyst',
  'Field Organizer',
  'Communications Director',
];

async function seedUsers() {
  try {
    for (const role of roles) {
      const email = `${role.toLowerCase().replace(/ /g, '')}@lxn.app`;
      const password = 'password123'; // default password for all seeded users

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log(`User with email ${email} already exists. Skipping.`);
        continue;
      }

      const user = new User({ email, password, role });
      await user.save();
      console.log(`Seeded user: ${email} with role: ${role}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();
