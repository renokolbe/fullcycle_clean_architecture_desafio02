import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", ()=> {

    it("Should create a customer", ()=> {

        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();

    });

    it("should create a customer with address", ()=> {

        const address = new Address("Rua 1", 1, "01001-001", "Sao Paulo");
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeDefined();
        expect(customer.address).toBe(address);

    });
});