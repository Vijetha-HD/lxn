require('dotenv').config();
const mongoose = require('mongoose');
const Budget = require('./models/Budget');
const {User} = require('./models/User');

async function seedBudgets() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Find the Campaign Manager user to assign budgets
    const campaignManager = await User.findOne({ role: 'Campaign Manager' });

    if (!campaignManager) {
      console.error('No Campaign Manager user found! Run seedUsers.js first.');
      process.exit(1);
    }

    // Optional: clear existing budgets
    await Budget.deleteMany();

    // Create dummy budgets
    const dummyBudgets = [
      {
        title: 'Digital Ads',
        category: 'Digital Ads',
        amount: 500000,
        spent: 250000,
        date: new Date('2025-01-15'),
        description: 'Google & Facebook Ads',
        createdBy: campaignManager._id,
      },
      {
        title: 'Rallies & Events',
        category: 'Rallies & Events',
        amount: 300000,
        spent: 150000,
        date: new Date('2025-02-10'),
        description: 'Political rallies and local events',
        createdBy: campaignManager._id,
      },
      {
        title: 'Print & TV Media',
        category: 'Print & TV Media',
        amount: 400000,
        spent: 200000,
        date: new Date('2025-03-05'),
        description: 'Print ads, TV commercials',
        createdBy: campaignManager._id,
      },
      {
        title: 'Field Operations',
        category: 'Field Operations',
        amount: 350000,
        spent: 175000,
        date: new Date('2025-04-20'),
        description: 'Ground team coordination',
        createdBy: campaignManager._id,
      },
    ];

    await Budget.insertMany(dummyBudgets);
    console.log('Budgets seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding budgets:', error);
    process.exit(1);
  }
}

seedBudgets();
