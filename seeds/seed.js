const sequelize = require('../config/connection');
const { Product, Tag, Category } = require('../models');

let { faker } = require('@faker-js/faker');

const categorySeedData = require('./categorySeedData.json');
const productSeedData = require('./productSeedData.json');
const tagSeedData = require('./tagSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const category = await Category.bulkCreate(categorySeedData);
  const product = await Product.bulkCreate(productSeedData);
  const tag = await Tag.bulkCreate(tagSeedData);

    console.log(faker.music.genre())
   
    await Product.create({
      product_name: faker.music.genre(),
      stock: (Math.random() * 10000 + 1000).toFixed(2),
      price: Math.floor(Math.random() * 10) + 1,
      category_id: null
    }).catch((err) => {
     
      console.log(err);
    });
  

  process.exit(0);
};

seedDatabase();
