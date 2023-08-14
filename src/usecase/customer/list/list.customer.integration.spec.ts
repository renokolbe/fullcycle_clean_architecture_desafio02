import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";

const customer1 = CustomerFactory.createWithAddress("John Doe", new Address("Street 1", 1, "01001-001", "Sao Paulo"));
const customer2 = CustomerFactory.createWithAddress("Jane Doe", new Address("Street 2", 20, "01002-001", "Sao Paulo"));

describe("Integration Test for listing customer use case", () => {

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

    it("Should list a customer",async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const output = await usecase.execute([]);

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[0].address.number).toBe(customer1.address.number);
        expect(output.customers[0].address.zip).toBe(customer1.address.zip);
        expect(output.customers[0].address.city).toBe(customer1.address.city);
        
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
        expect(output.customers[1].address.number).toBe(customer2.address.number);
        expect(output.customers[1].address.zip).toBe(customer2.address.zip);
        expect(output.customers[1].address.city).toBe(customer2.address.city);


    });

  
});