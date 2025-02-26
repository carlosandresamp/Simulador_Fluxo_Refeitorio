import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";

export class getOutFromTurnstileToTheInternalQueue implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Saída da Catraca para Fila Interna`);
        
        const student = this.cafeteria.getTurnstile().getStudent();
        if(!student) {
            console.log("[ERRO] Catraca não possui aluno");
            return;
        }

        const _enterInternalQueue = this.cafeteria.getInternalQueue().addStudent(student);
        if(!_enterInternalQueue) {
            console.log("[INFO] Aluno não pode entrar na fila interna");
            return;
        }

        console.log(`[INFO] Estudante ${student.getRegistration()} entrou na fila interna`);

        const nextEventTime = this.timestamp + this.cafeteria.getTurnstile().calculateRegisterTime();
        let newEvent = new FromInternalQueueToTheService(nextEventTime, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}