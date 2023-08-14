import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoyInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository  implements OrderRepositoyInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{model: OrderItemModel}],
        });
    }

    // Como o Sequelize nao possui tratamento para UPDATE de dados associados, é necessario
    // 1 - Excluir os itens do Pedido (OrderItemModel.destroy)
    // 2 - Incluir novamente os itens no Pedido (OrderItemModel.bulkCreate)
    // 3 - Por fim a atualização dos dados do Pedido (OrderModel.update)
    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
          await OrderItemModel.destroy({
            where: { order_id: entity.id },
            transaction: t,
          });
          const items = entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          }));
          await OrderItemModel.bulkCreate(items, { transaction: t });
          await OrderModel.update(
            { total: entity.total() },
            { where: { id: entity.id }, transaction: t }
          );
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try{
            orderModel = await OrderModel.findOne({
                where: {
                    id: id,
                },
                include: [{ model: OrderItemModel }],
                rejectOnEmpty: true,
            })
        }
        catch (error){
            throw new Error("Order not found")
        }

        const orderItems: Array<OrderItem> = [];
        orderModel.items.map(item => {
            let orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            orderItems.push(orderItem);
        });
        
        const order = new Order(id, orderModel.customer_id, orderItems);

        return order;
    }

    async findAll(): Promise<Order[]> {
        
        const ordersModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        });

        const orders = ordersModels.map((ordersModels) => {
            let orderItems: Array<OrderItem> = [];
            ordersModels.items.map(item => {
                let orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
                orderItems.push(orderItem);
            });
            
            let order = new Order(ordersModels.id, ordersModels.customer_id, orderItems);
            return order;
        } )
        return orders;
    }

}