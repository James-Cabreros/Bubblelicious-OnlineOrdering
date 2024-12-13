const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const PromoImage = require('./models/PromoImage');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Sample promo images data
const promoImages = [
  {
    name: 'Nutella Special',
    description: 'Indulge in the rich and creamy Nutella blend. 50% OFF on your second cup!',
    image: '/images/promo-image.jpg',
  },
  {
    name: 'Matcha Delight',
    description: 'Experience the earthy and creamy taste of our Matcha Delight.',
    image: '/images/promo-image1.jpg',
  },
  {
    name: 'Cookies & Cream',
    description: 'Savor the classic Cookies & Cream flavor with every sip.',
    image: '/images/promo-image2.jpg',
  },
  {
    name: 'Summer Berry Bliss',
    description: 'A refreshing blend of summer berries to beat the heat.',
    image: '/images/promo-image3.jpg',
  },
  {
    name: 'Caramel Crunch',
    description: 'Sweet caramel paired with a satisfying crunch in every bite.',
    image: '/images/promo-image4.jpg',
  },
];

// Insert promo images into the database
const seedDatabase = async () => {
  try {
    await PromoImage.insertMany(promoImages);
    console.log('Promo images added to the database!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
