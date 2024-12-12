const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const BestSeller = require('./models/BestSeller');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Sample data
const bestSellers = [
  {
    name: 'Honey Glazed Wings',
    price: 99,
    details: 'Crispy wings coated in sweet honey glaze.',
    image: '/images/honey-glazed-wings.jpg', // Replace with actual image URL or path
  },
  {
    name: 'Milk Tea Matcha',
    price: 99,
    details: 'Refreshing matcha milk tea with tapioca pearls.',
    image: '/images/milk-tea-matcha.jpg',
  },
  {
    name: 'Spicy Sriracha Wings',
    price: 99,
    details: 'Fiery chicken wings tossed in sriracha sauce.',
    image: '/images/spicy-sriracha-wings.jpg',
  },
  {
    name: 'Cookies and Cream Milk Tea',
    price: 99,
    details: 'Creamy milk tea with cookie crumble topping.',
    image: '/images/cookies-and-cream.jpg',
  },
  {
    name: 'Garlic Parmesan Wings',
    price: 99,
    details: 'Savory wings sprinkled with garlic and parmesan.',
    image: '/images/garlic-parmesan-wings.jpg',
  },
];

// Insert data into the database
const seedDatabase = async () => {
  try {
    await BestSeller.insertMany(bestSellers);
    console.log('Best sellers added to the database!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
