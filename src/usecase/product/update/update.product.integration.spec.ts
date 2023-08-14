import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = new Product("p1", "Product 1", 10);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 20,
};

describe("Integration Test for product update use case", () => {

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

    it("Should update a product", async () => {

        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        await productRepository.create(product);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });

    });

});
