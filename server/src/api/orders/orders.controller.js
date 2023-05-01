import {OrderDAO} from "../../dao/orderDAO";

export default class OrdersController {
    static async createOrder(req, res) {
        const order = await OrderDAO.createOrder(req);
        if (order) {
            res.status(200).json({
                message: "Заказ создан!"
            });
        } else {
            res.status(406).json({
                message: "Не удалось создать заказ"
            })
        }
    }

    static async getAllOrders(req, res) {
        const orders = await OrderDAO.getAllOrders(req);
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(406).json({
                message: "Не удалось получить заказы"
            })
        }
    }
}