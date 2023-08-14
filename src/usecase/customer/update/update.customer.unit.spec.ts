import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

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

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit Test for customer update use case", () => {

    it("Should update a customer", async () => {

        const customerRepository = MockRepository();
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
