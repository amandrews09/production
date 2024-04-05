const User = require('./User');
const Product = require('./Product');
const Comment = require('./Comment');
User.hasMany(Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Product.belongsTo(User, {
  foreignKey: 'user_id'
});
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
Product.hasMany(Comment, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Product, {
  foreignKey: 'product_id'
});

module.exports = { User, Product, Comment };