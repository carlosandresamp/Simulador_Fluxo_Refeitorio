import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
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
        const turnstileAccessable = this.cafeteria.getTurnstile();
        
        if(!student){
            throw new Error("Erro: catraca não possui aluno.");
        }
    
        if (_isInternalQueueFull) {
            turnstileAccessable.setAccessable(false);
            console.log("[INFO] Fila interna cheia: evento aguardando espaço disponível.");
            return;
        }

        const _enterInternalQueue = this.cafeteria.enterInternalQueue();
        if(!_enterInternalQueue){
            console.log("[INFO] Aluno não pode entrar na fila interna");
            return;
        }
        
        if(!_isExternalQueueEmpty){
            turnstileAccessable.setAccessable(true);
        }

        console.log(`Aluno ${student.getRegister()} entrou na fila interna`);

        const registerTiming = this.cafeteria.getTurnstile().calculateRegisterTime();
        const nextEventTime = this.timestamp + registerTiming;
        if (nextEventTime < this.timestamp) {
            throw new Error("[ERRO] Tempo do próximo evento inválido.");
        }
        
        let newEvent = new FromInternalQueueToTheService(nextEventTime, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}