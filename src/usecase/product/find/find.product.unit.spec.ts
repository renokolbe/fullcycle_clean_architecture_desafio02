import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("p1", "Product 1", 10);

const MOckRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};


describe("Unit Test find product use case", () => {

    it("Should find a product",async () => {

        const productRepository = MOckRepository();
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

        const productRepository = MOckRepository();
        productRepository.find.mockImplementation( ()=> {
            throw new Error("Product not found");
        });
        const usecase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            id : "p1",
        };

        expect( () =>{
            return usecase.execute(input)
        }).rejects.toThrow("Product not found")

    });

});