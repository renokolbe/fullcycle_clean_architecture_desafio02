import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "1", []);
        }).toThrowError("Id is required");
    });

    it("Should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("customerId is required");
    });

    it("Should throw error when item qtd is empty", () => {
        expect(() => {
            let order = new Order("1", "1", []);
        }).toThrowError("Items are required");
    });

    it("Should calculate total", () => {
        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const order1 = new Order("o1", "c1", [item1]);
        
        let total = order1.total();

        expect(total).toBe(200);

        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        const order2 = new Order("o2", "c1", [item1, item2]);
        
        total = order2.total();

        expect(total).toBe(600);

    });

    it("Should throw error if item qty is less or equal zero", () => {

        expect(() => {
            const item1 = new OrderItem("i1", "Item 1", 100, "p1", -1);
            const order1 = new Order("o1", "c1", [item1]);
            }).toThrowError("Quantity mus be greater than 0");

    });

})