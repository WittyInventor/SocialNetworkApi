const category = require('./category');
const product = require('./product');
const productTag = require('./productTag');
const tag = require('./tag');

product.belongsTo(category, {
  foreignKey: 'category_id',
  // onDelete: 'CASCADE',?? not sure to keep
});

category.hasMany(product, {
  foreignKey: 'category_id',
  // onDelete: 'CASCADE',
});

product.belongsToMany(tag);
tag.belongsToMany(product);


product.hasMany(productTag, {
  foreignKey: 'product_id',
  // onDelete: 'CASCADE',
});


module.exports = { category, product, productTag, tag };
