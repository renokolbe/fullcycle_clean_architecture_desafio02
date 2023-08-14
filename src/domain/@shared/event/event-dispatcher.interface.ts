import eventHandlerInterface from "./event.handler.interface";
import EventInterface from "./event.interface";

// Registra e Notifica os eventos que ocorreram

export default interface EventDispatcherInterface{

    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: eventHandlerInterface): void;
    unregister(eventName: string, eventHandler: eventHandlerInterface): void;
    unregisterAll(): void;

}