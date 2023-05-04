import {order} from "../index";


export class OrderDAO {
    static async createOrder(req) {
        const newOrder =  {
            id_customer: req.body.customerId,
            price: req.body.price,
            status: req.body.status
        }
        let info;
        await order.create(newOrder).then((data) => info = data);
        return info;
    };

    static async getAllOrders(req) {
        let info = await order.findAll({
            where: {
                id_customer: req.params.id
            }
        });
        return info;
    }
}