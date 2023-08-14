import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: "p1",
    name: "Product 1",
    price: 10,
};

const MOckRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test create product use case", () => {

    it("Should create a product", async () => {

        const productRepository = MOckRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });

    });

    it("Should thrown an error when id is missing", async () => {

        const productRepository = MOckRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.id = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Id is required");

    });

    it("Should thrown an error when name is missing", async () => {

        const productRepository = MOckRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.id = "p1";
        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("name is required");

    });

    it("Should thrown an error when price is less than zero", async () => {

        const productRepository = MOckRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.id = "p1";
        input.name = "Product 1";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");

    });

});