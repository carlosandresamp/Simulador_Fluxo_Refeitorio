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
        // Exibir o timestamp em segundos com duas casas decimais
        console.log(`Evento - Da Mesa Para Casa - ${this.timestamp.toFixed(2)} segundos`);
        
        const hall = this.cafeteria.getHall();
        const students = hall.getStudents();

        if (students.length > 0) {
            const student = students[0];
            this.cafeteria.finishMeal(student, this.timestamp);
            console.log(`${student.getRegistration()} terminou a refeição e está saindo.`);

            // Verificar se há alunos esperando na fila interna
            const internalQueue = this.cafeteria.getInternalQueue();
            if (!internalQueue.emptyInternalQueue()) {
                const averageProcessingTime = 5; // em segundos
                const nextEvent = new FromInternalQueueToTheService(
                    this.timestamp + averageProcessingTime, // Manter como ponto flutuante
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