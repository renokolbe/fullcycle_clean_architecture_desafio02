import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendMessageWhenAddressHasChanged implements EventHandlerInterface<CustomerAddressChangedEvent>{

    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.customer_id}, ${event.customer_name} alterado para: ${event.customer_address}`);
    }
};