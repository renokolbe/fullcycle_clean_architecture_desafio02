import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John")
        }).toThrowError("Id is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name is required");
    });

    it("Should change name", () => {

        // Arrange
        const customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane")

        // Assert
        expect(customer.name).toBe("Jane")

    });

    it("Should throw error when change name is empty", () => {

        const customer = new Customer("123", "John");
        customer.changeName("Jane")
        expect(() => {
            customer.changeName("")
        }).toThrowError("Name is required");

    });

    it("Should activate customer", () => {

        // Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua 1", 123, "01001-001","São Paulo");
        customer.Address = address;

        // Act
        customer.activate();

        // Assert
        expect(customer.isActive()).toBe(true)

    });

    it("Should deactivate customer", () => {

        // Arrange
        const customer = new Customer("1", "Customer 1");

        // Act
        customer.deactivate();

        // Assert
        expect(customer.isActive()).toBe(false)

    });

    it("Should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer");


    });

    it("Should add reward points", () => {

        // Inicializa 
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        
        // Adiciona 10
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
                
        // Adiciona 10
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    })

})