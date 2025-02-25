import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./eventMachine";

export abstract class Event {
    protected timestamp: number;
    protected cafeteria: Cafeteria;
    protected machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    abstract processEvent(): void;

    getTimestamp(): number {
        return this.timestamp;
    }
}
