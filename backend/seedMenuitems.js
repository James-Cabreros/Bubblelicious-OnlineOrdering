const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const MenuItem = require('./models/MenuItem'); // Ensure this matches your Mongoose schema file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Sample data
const menuItems = [
  {
    name: 'Classic Milk Tea',
    image: '/images/classic-milk-tea.jpg',
    description: 'Rich and creamy classic milk tea.',
    price: 120,
    category: 'beverages',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    name: 'Spaghetti Bolognese',
    image: '/images/spaghetti-bolognese.jpg',
    description: 'Classic Italian spaghetti with savory Bolognese sauce.',
    price: 150,
    category: 'meals',
  },
  {
    name: 'Chicken Nuggets',
    image: '/images/chicken-nuggets.jpg',
    description: 'Crispy golden chicken nuggets.',
    price: 80,
    category: 'snacks',
  },
  {
    name: 'Chocolate Milkshake',
    image: '/images/chocolate-milkshake.jpg',
    description: 'Thick and creamy chocolate milkshake.',
    price: 130,
    category: 'beverages',
    sizes: ['Regular', 'Large'],
  },
  {
    name: 'Cheeseburger',
    image: '/images/cheeseburger.jpg',
    description: 'Juicy beef patty with melted cheese.',
    price: 120,
    category: 'meals',
  },
];

// Insert data into the database
const seedDatabase = async () => {
  try {
    await MenuItem.insertMany(menuItems);
    console.log('Menu items added to the database!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
