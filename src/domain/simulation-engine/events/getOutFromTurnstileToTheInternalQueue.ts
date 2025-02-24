import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
import { FromServiceToTheTable } from "./fromServiceToTheTable";
export class getOutFromTurnstileToTheInternalQueue extends Event{

    constructor(timestamp: number,cafeteria: Cafeteria,machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }
    processEvent(): void {
        console.log(`[${this.timestamp}s] Evento: Saída da Catraca para Fila Interna`);
        
        const student = this.cafeteria.getTurnstile().getStudent();
        if(!student){
            throw new Error("Erro: catraca não possui aluno.");

        }
        const internalQueue = this.cafeteria.getInternalQueue();
        if (internalQueue.isInternalQueueFull()) {
            this.cafeteria.getTurnstile().setAccessable(false);
            throw new Error("[ERRO] Fila interna cheia: espere esvaziar.");
        }

        this.cafeteria.enterInternalQueue();
        this.cafeteria.getTurnstile().setAccessable(false);

        if (this.cafeteria.getTurnstile().getStudent()) {
            throw new Error("[ERRO] Aluno não foi removido da catraca.");
        }

        console.log(`Aluno ${student.getRegister()} entrou na fila interna`);


        const nextEventTime = this.timestamp + 5;
        if (nextEventTime <= this.timestamp) {
            throw new Error("[ERRO] Tempo do próximo evento inválido.");
        }
        this.machine.addEvent(new FromServiceToTheTable(nextEventtTime, this.cafeteria, this.machine));
        const newEvent = new

    }
}