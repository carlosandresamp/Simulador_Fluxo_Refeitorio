import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
import { FromServiceToTheTable } from "./fromServiceToTheTable";
import { InternalQueue } from "../system/internalQueue";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";
export class getOutFromTurnstileToTheInternalQueue extends Event{

    constructor(timestamp: number,cafeteria: Cafeteria,machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }
    processEvent(): void {
        console.log(`[${this.timestamp}s] Evento: Saída da Catraca para Fila Interna`);
        
        const student = this.cafeteria.getTurnstile().getStudent();
        const _isExternalQueueEmpty = this.cafeteria.getExternalQueue().emptyExternalQueue();
        const _isInternalQueueFull = this.cafeteria.getInternalQueue().isInternalQueueFull();
        const enteringInternalQueue = this.cafeteria.enterInternalQueue();
        const turnstileAccessable = this.cafeteria.getTurnstile();
        const turnstile = this.cafeteria.getTurnstile();
        
        if(!student){
            throw new Error("Erro: catraca não possui aluno.");
        }
    
        if (_isInternalQueueFull) {
            turnstileAccessable.setAccessable(false);
            throw new Error("[ERRO] Fila interna cheia: espere esvaziar.");
        }

        turnstile.removeStudent();
        
        if(!_isExternalQueueEmpty){
            turnstileAccessable.setAccessable(true);
        }

        this.cafeteria.enterTurnstile();

        console.log(`Aluno ${student.getRegister()} entrou na fila interna`);

        const nextEventTime = this.timestamp + 5;
        if (nextEventTime <= this.timestamp) {
            throw new Error("[ERRO] Tempo do próximo evento inválido.");
        }
        
        let newEvent = new FromInternalQueueToTheService(nextEventTime, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}