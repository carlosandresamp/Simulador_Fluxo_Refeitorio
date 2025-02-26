import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";

export class FromTurnstileToInternalQueue implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`Evento - Da Catraca Para Fila Interna - ${this.timestamp}`);
        const student = this.cafeteria.getTurnstile().getStudent();
        
        if (student) {
            console.log(`Estudante ${student.getRegistration()} terminou de registrar matrícula.`);
            this.cafeteria.moveStudentToInternalQueue();
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
} 