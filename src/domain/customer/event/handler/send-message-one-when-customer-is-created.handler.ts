import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendMessageOneWhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedEvent>{

    enviaConsoleLogHandler(): void{
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }

    handle(event: CustomerCreatedEvent): void {
        this.enviaConsoleLogHandler();
    }
}