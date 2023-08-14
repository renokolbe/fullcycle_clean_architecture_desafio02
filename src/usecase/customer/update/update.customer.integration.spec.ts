import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";

const customer = CustomerFactory.createWithAddress("John", new Address("Rua 1", 1, "01001-001", "Sao Paulo"));

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Rua 1 Atualizada",
        number: 100,
        zip: "01001-002",
        city: "Nova Sao Paulo"
    },
};


describe("Integration Test for customer update use case", () => {

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

    it("Should update a customer", async () => {

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            },
        });

    });

});
