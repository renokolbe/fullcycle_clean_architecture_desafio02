import Address from "../../customer/value-object/address";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendMessageWhenAddressHasChanged from "../../customer/event/handler/send-message-when-address-has-changed.handler";
//import SendMessageWhenCustomerIsCreated from "../../customer/event/handler/send-message-one-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import SendMessageOneWhenCustomerIsCreated from "../../customer/event/handler/send-message-one-when-customer-is-created.handler";
import SendMessageTwoWhenCustomerIsCreated from "../../customer/event/handler/send-message-two-when-customer-is-created.handler";

describe("Domain events tests", ()=> {

    it("should register an event handler", ()=> {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", ()=> {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handlers", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        // Notify - Executa o SendEmailWhenProductIsCreatedHandler.handle
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

    it("should register an event Customer Created handler", ()=> {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageOneWhenCustomerIsCreated();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should notify Customer Created event handler", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendMessageOneWhenCustomerIsCreated();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

        const eventHandler2 = new SendMessageTwoWhenCustomerIsCreated();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1"
        });

        // Notify - Executa o SendMessageWhenCustomerIsCreated.handle
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

    it("should register an event Customer Address Changed handler", ()=> {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenAddressHasChanged();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should notify Customer Address Changed event handler", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenAddressHasChanged();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const address = new Address("Rua 2", 200, "01001-002", "Sao Paulo");

        const customerAddressChangedEvent = new CustomerAddressChangedEvent(
            {
                name: "Customer 1"
            },
            "c1",
            "Customer1",
            address,
        );

        // Notify - Executa o SendMessageWhenCustomerIsCreated.handle
        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

});