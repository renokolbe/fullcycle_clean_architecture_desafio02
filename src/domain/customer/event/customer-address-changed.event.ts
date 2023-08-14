import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export default class CustomerAddressChangedEvent implements EventInterface{
    
    dateTimeOccured: Date;
    eventData: any;
    customer_id: string;
    customer_name: string;
    customer_address: Address;

    constructor(eventData: any, customer_id: string, customer_name: string, customer_address: Address){
        this.dateTimeOccured = new Date();
        this.eventData = eventData;
        this.customer_id = customer_id;
        this.customer_name = customer_name;
        this.customer_address = customer_address;
    }

}