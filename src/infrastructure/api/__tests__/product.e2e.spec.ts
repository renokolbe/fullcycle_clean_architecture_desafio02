import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for product", ()=> {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "p1",
                name: "Product 1",
                price: 100,
            });
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe("p1");
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);

    });

    it("should not create a product",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
            });
        
        expect(response.status).toBe(500);

    });

    it("should list all products",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "p1",
                name: "Product 1",
                price: 100,
            });
        
        expect(response.status).toBe(200);
 
        const response2 = await request(app)
            .post("/product")
            .send({
                id: "p2",
                name: "Product 2",
                price: 150,
            });
        
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        
        const customer = listResponse.body.products[0];
        expect(customer.name).toBe("Product 1");
        expect(customer.price).toBe(100);
        
        const customer2 = listResponse.body.products[1];
        expect(customer2.name).toBe("Product 2");
        expect(customer2.price).toBe(150);
 
    });

});