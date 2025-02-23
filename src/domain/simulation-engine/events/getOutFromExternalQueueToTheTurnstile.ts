import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { time } from "console";
import { getOutFromTurnstileToTheInternalQueue } from "./getOutFromTurnstileToTheInternalQueue";

export class GetOutFromExternalQueueToTheTurnstile extends Event{

    constructor(timestamp:number, cafeteria:Cafeteria, machine:EventMachine){
        super(timestamp, cafeteria, machine);
    }
    
    processEvent(){
        console.log(`Evento - Sair da Fila Externa para a Catraca - ${this.timestamp}`);
        //Estado do evento
        const time = this.cafeteria.enterTurnstile();

        //Agendando novos eventos
        const instantCompletion = this.timestamp + time;
        const newTimestamp = new getOutFromTurnstileToTheInternalQueue(instantCompletion, this.cafeteria, this.machine);
        this.machine.addEvent(newTimestamp);
    }
}
