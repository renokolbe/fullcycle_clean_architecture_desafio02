import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = new Product("p1", "Product 1", 10);

describe("Integration Test find product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () =>{

        sequelize = new Sequelize ({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        })

        sequelize.addModels([ProductModel]);
        await sequelize.sync();

    } );

    afterEach(async () => {

        await sequelize.close();

    });


    it("Should find a product",async () => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            id : "p1",
        };

        const output = {
            id : "p1",
            name: "Product 1",
            price: 10,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);

    });

    it("Should not find a product",async () => {

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = {
            id : "p12",
        };

        const usecase = new FindProductUseCase(productRepository);

        expect( async () =>{
            await usecase.execute(input)
        }).rejects.toThrow("Product not found")

    });

});