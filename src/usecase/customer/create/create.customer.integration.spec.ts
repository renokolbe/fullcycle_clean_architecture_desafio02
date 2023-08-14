import { Sequelize } from "sequelize-typescript";
import CreateCustomerUseCase from "./create.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";

const input = {
    name: "John",
    address: {
        street: "Rua 1",
        number: 123,
        zip: "01001-001",
        city: "Sao Paulo",
    },
};

describe("Integration Test create customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () =>{

        sequelize = new Sequelize ({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    } );

    afterEach(async () => {

        await sequelize.close();

    });

    it("Should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            },
        });

    });

    it("Should thrown an error when name is missing", async () => {

        const customerRepository = new CustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");

    });

    it("Should thrown an error when street is missing", async () => {

        const customerRepository = new CustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");

    });

});