import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";

export class FromTableToHome implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`Evento - Da Mesa Para Casa - ${this.timestamp}`);
        
        const hall = this.cafeteria.getHall();
        const students = hall.getStudents();

        if (students.length > 0) {
            const student = students[0];
            this.cafeteria.finishMeal(student, this.timestamp);
            console.log(`${student.getRegistration()} terminou a refeição e está saindo.`);

            // Verificar se há alunos esperando na fila interna
            const internalQueue = this.cafeteria.getInternalQueue();
            if (!internalQueue.emptyInternalQueue()) {
                const nextEvent = new FromInternalQueueToTheService(
                    this.timestamp + 0.1,
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