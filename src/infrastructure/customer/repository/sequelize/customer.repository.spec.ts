import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";

describe("Customer repositoy test", () => {

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

    it("should create a customer", async () =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer1");
        const address = new Address("Rua 1", 1, "01001-001", "Sao Paulo");
        customer.Address = address;

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: {id: "1"}});
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });

    });

    it("should update a customer", async () =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer1");
        const address = new Address("Rua 1", 1, "01001-001", "Sao Paulo");
        customer.Address = address;

        await customerRepository.create(customer);

        customer.changeName("Customer 2")

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: {id: "1"}});
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });

    });

    it("should find a customer", async() =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer1");
        const address = new Address("Rua 1", 1, "01001-001", "Sao Paulo");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", async() =>{
        const customerRepository = new CustomerRepository();

        expect(async()=>{
            await customerRepository.find("456ABC")
        }).rejects.toThrow("Customer not found")
    });


    it("should find all customers", async() =>{
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer1");
        const address1 = new Address("Rua 1", 1, "01001-001", "Sao Paulo");
        customer1.Address = address1;
        customer1.addRewardPoints(30);

        const customer2 = new Customer("2", "Customer2");
        const address2 = new Address("Rua 2", 1, "01001-001", "Sao Paulo");
        customer2.Address = address2;
        customer1.addRewardPoints(50);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);

    });


});
