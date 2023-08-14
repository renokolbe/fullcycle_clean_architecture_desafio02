import EventInterface from "./event.interface";

// Executa os Eventos

export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {

    handle(event: T): void;

}