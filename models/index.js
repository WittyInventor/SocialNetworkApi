const Category = require('./category');
const Product = require('./product');
const ProductTag = require('./productTag');
const Tag = require('./tag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  // calling for single category
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
});

Tag.belongsToMany(Product, {
  through: ProductTag,
});



module.exports = { Category, Product, ProductTag, Tag };
