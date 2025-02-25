import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./eventMachine";

export interface Event {
    processEvent(): void;
    getTimestamp(): number;
}
