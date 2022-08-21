import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Sohag',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'User',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {

      name: 'I phone 13',
      slug: 'iphone13',
      category: 'SmarPhone',
      image: '/images/p1.jpg',
      price: 12000,
      countInStock: 10,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality',
    },
    {

      name: 'Mac book pro',
      slug: 'macbookpro',
      category: 'Laptop',
      image: '/images/p2.jpg',
      price: 250000,
      countInStock: 0,
      brand: 'Apple',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality',
    },
    {

      name: 'Lg Tv',
      slug: 'lgtv',
      category: 'TV',
      image: '/images/p3.jpg',
      price: 1500000,
      countInStock: 15,
      brand: 'LG',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality',
    },
    {

      name: 'Hp laptop',
      slug: 'hplaptop',
      category: 'Laptop',
      image: '/images/p4.jpg',
      price: 75000,
      countInStock: 5,
      brand: 'HP',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality',
    },
  ],
};
export default data;
