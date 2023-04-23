import { product, photo, category, productCategory } from "../index";

export class ProductDAO {
    // create product
    static async createProduct(req) {
        let item;
        await product.create({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
            energyValue: req.body.energyValue,
            weight: req.body.weight
        }).then(data => item = data);
        return item;
    };

    // get all products
    static async getProducts(req) {
        let start = req.body.start || 0;
        let count = req.body.count || 20;
        let products;

        const numberOfRows = await product.count({});

        await product.findAll({
            limit: [start, count],
            include: [{
                model: photo,
                attributes: ["photo_name", "photo"]
            }],
        }).then(data => products = data);
        return { products, numberOfRows };
    };

    // get product by ID
    static async getProductById(req) {
        return await product.findOne({
            where: { id: req.params.id },
            include: [{
                model: photo,
                attributes: ["photo_name", "photo"]
            }],
        });
    }

    // get products by CATEGORY
    static async getProductsByCategory(req) {
        const start = req.body.start || 0;
        const count = req.body.count || 20;

        let categoryId;
        await category.findOne({
            where: { name: req.body.name }
        }).then(data => categoryId = data.dataValues.id);

        let arrayProductId;
        await productCategory.findAll({
            where: {
                id_category: categoryId
            }
        }).then(data => {
            arrayProductId = data.map((obj) => obj.dataValues.id_product);
        });

        const numberOfRows = await productCategory.count({ where: { id_category: categoryId } });

        const products = await product.findAll({
            where: { id: arrayProductId },
            limit: [start, count],
            include: [{
                model: photo,
                attributes: ["photo_name", "photo"]
            }],
        });

        return { products, numberOfRows }
    }
}