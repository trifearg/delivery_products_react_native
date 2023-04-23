import { app } from "./server";

const passport = require("passport");
let cart = require('./models/cart');
let photo = require('./models/photo');
let product = require('./models/product');
let category = require('./models/category');
let customer = require('./models/customer.js');
let cartProduct = require('./models/cart_product');
let productCategory = require('./models/product_category');

const Sequelize = require('sequelize');

const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data.db'
});

sequelize.authenticate()
    .then(app.listen(PORT, () => {
        console.log(`Server has been started on http://localhost:${PORT}`)
    }))
    .catch(err => console.error('Connection error: ', err));

app.use(passport.initialize());
require("./middleware/passport")(passport);

let dbCart = cart(sequelize);
let dbPhoto = photo(sequelize);
let dbProduct = product(sequelize);
let dbCustomer = customer(sequelize);
let dbCategory = category(sequelize);
let dbCartProduct = cartProduct(sequelize);
let dbProductCategory = productCategory(sequelize);

dbCustomer.belongsTo(dbCart, { onDelete: 'CASCADE', onUpdate: 'NO ACTION', foreignKey: 'id' });
dbCart.hasMany(dbCartProduct, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_cart' });
dbCart.belongsToMany(dbProduct, { through: dbCartProduct, foreignKey: 'id_cart' });
dbProduct.belongsToMany(dbCart, { through: dbCartProduct, foreignKey: 'id_product' });
dbProduct.hasMany(dbPhoto, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });
dbProduct.hasMany(dbProductCategory, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });
dbCategory.belongsToMany(dbProduct, { through: dbProductCategory, foreignKey: 'id_category' });
dbProduct.belongsToMany(dbCategory, { through: dbProductCategory, foreignKey: 'id_product' });

dbCartProduct.hasMany(dbPhoto, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });
dbProduct.belongsTo(dbCartProduct, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id' });
dbCartProduct.belongsTo(dbProduct, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });
dbCartProduct.hasMany(dbPhoto, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });
dbPhoto.belongsTo(dbCartProduct, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });
dbCartProduct.belongsTo(dbPhoto, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', foreignKey: 'id_product' });

module.exports.cart = dbCart;
module.exports.photo = dbPhoto;
module.exports.product = dbProduct;
module.exports.customer = dbCustomer;
module.exports.cartProduct = dbCartProduct;
module.exports.category = dbCategory;
module.exports.productCategory = dbProductCategory;
module.exports.sequelize = sequelize;

// sequelize.sync()
//     .then(() => {
//         console.log('Таблица создана');
//     })
//     .catch((error) => {
//         console.error('Ошибка создания таблицы:', error);
//     });

/*
sequelize.close()
  .then(() => console.log('Closed.'))
  .catch(err => console.error('Close connection error: ', err));
*/
