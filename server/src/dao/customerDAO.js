import { customer } from '../index';

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

export class CustomerDAO {

    // get customer by EMAIL
    static async getCustomerByEmail(req) {
        return await customer.findOne({
            where: { email: req.body.email }
        });
    }

    // get customer by ID
    static async getCustomerById(req) {
        return await customer.findByPk(req.params.id);
    }

    // register customer
    static async createCustomer(req) {
        const password = req.body.password;
        let user;

        await customer.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        }).then(data => user = data);

        return user;
    };

    // get all customers
    static async getCustomers() {
        let customers;
        await customer.findAll().then(data => customers = data);
        return { customers };
    };

    // update customer
    static async updateCustomer(req) {
        let response;
        await customer.update({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => response = this.getCustomerById(req));
        return response;
    }

    // delete customer by ID
    static async deleteCustomerById(req) {
        let response;
        await customer.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => response = { message: `Пользователь с ID = ${req.params.id} удален!` });
        return response;
    }
}

module.exports.CustomerDAO = CustomerDAO;