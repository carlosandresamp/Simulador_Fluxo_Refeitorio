import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./maquinaEvento";

 abstract class Event {
   protected timestamp :number;
   protected cafeteria:Cafeteria;
   protected machine:EventMachine;

    constructor(timestamp:number,cafeteria:Cafeteria,machine:EventMachine){
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }
    public getTimestamp():number {
        return this.timestamp;
    }

   abstract processEvent(): void;
}
