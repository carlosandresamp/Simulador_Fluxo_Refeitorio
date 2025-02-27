import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./eventMachine";

export class Event {
    processEvent(): void;
    getTimestamp(): number;
}
