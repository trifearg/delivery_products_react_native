import {order} from "../index";


export class OrderDAO {
    static async createOrder(req) {
        const newOrder =  {
            id_customer: req.body.customerId,
            price: req.body.price,
            status: req.body.status
        }
        await order.create(newOrder).then(() => console.log("Создан новый заказ!"));
    };

    static async getAllOrders(req) {
        let info = await order.findAll({
            where: {
                id_customer: req.body.customerId
            }
        });
        return info;
    }
}