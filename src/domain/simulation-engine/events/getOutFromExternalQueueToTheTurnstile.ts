import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { error, time } from "console";
import { getOutFromTurnstileToTheInternalQueue } from "./getOutFromTurnstileToTheInternalQueue";

export class GetOutFromExternalQueueToTheTurnstile extends Event{

    constructor(timestamp:number, cafeteria:Cafeteria, machine:EventMachine){
        super(timestamp, cafeteria, machine);
    }
    
    processEvent(){
        console.log(`Evento - Sair da Fila Externa para a Catraca - ${this.timestamp}`);
        //verificar se há alguem na fila externa
        let somebodyOnExternalQueue= this.cafeteria.getExternalQueue().emptyExternalQueue();
        let internalQueue = this.cafeteria.getInternalQueue().isInternalQueueFull();
        let TurnstileAccessible = this.cafeteria.getTurnstile().isTurnstileAccessable();

        if(!somebodyOnExternalQueue){
            console.log("Nenhum aluno na fila externa. Evento encerrado.");
            return;
        }

        //Verifica se a fila interna esta cheia para liberar a catraca
        if(internalQueue){
            throw new Error("Catraca Bloqueada: Fila interna excedeu a sua capacidade");
        }

        if(!TurnstileAccessible){
            throw new Error("Catraca indisponível");
        }

        let removingStudent = this.cafeteria.getExternalQueue().removeStudent();
        if(!removingStudent){
            throw new Error("Erro ao tentar remover estudante da fila externa");
        }

        //Estado do evento
        const timeToEnter = this.cafeteria.enterTurnstile();
        if(timeToEnter <= 0){
            throw new Error("Tempo de registro da matrícula inválido.");
        }

        //Agendando novos eventos
        const instantCompletion = this.timestamp + timeToEnter;
        const newEvent = new getOutFromTurnstileToTheInternalQueue(instantCompletion, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}
