import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendMessageTwoWhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedEvent>{

    enviaConsoleLogHandler(): void{
        console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }

    handle(event: CustomerCreatedEvent): void {
        this.enviaConsoleLogHandler();
    }
}