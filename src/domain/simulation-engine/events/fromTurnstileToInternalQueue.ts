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

        if (this.cafeteria.moveStudentToInternalQueue()) {
            const student = this.cafeteria.getInternalQueue().getLastStudent();
            if (student) {
                student.setStatus("IN_QUEUE");
                console.log(`${student.getMatricula()} entrou na fila interna.`);

                // Criar evento para mover para o atendimento
                const nextEventTime = this.timestamp + 1; // Tempo mínimo de espera
                const nextEvent = new FromInternalQueueToTheService(
                    nextEventTime,
                    this.cafeteria,
                    this.machine
                );
                
                this.machine.addEvent(nextEvent);
            }
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
} 