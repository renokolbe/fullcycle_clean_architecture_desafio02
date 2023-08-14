import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Rua 1", 1, "01001-001", "Sao Paulo");
customer.changeAddress(address);

const MOckRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit Test find customer use case", () => {

    it("Should find a customer",async () => {

        const customerRepository = MOckRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        await customerRepository.create(customer);

        const input = {
            id : "123",
        };

        const output = {
            id : "123",
            name: "John",
            address : {
                street: "Rua 1",
                number: 1,
                zip: "01001-001",
                city: "Sao Paulo"
            },
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);

    });

    it("Should not find a customer",async () => {

        const customerRepository = MOckRepository();
        customerRepository.find.mockImplementation( ()=> {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        await customerRepository.create(customer);

        const input = {
            id : "123",
        };

        expect( () =>{
            return usecase.execute(input)
        }).rejects.toThrow("Customer not found")

    });

});