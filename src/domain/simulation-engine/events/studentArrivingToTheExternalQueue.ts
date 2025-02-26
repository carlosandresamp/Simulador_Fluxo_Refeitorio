import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { RandomGeneratorI } from "../util/random-generators";
import { GetOutFromExternalQueueToTheTurnstile } from "./getOutFromExternalQueueToTheTurnstile";

export class StudentArrivingToTheExternalQueue implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;
    private student: Student;
    private randomGenerator: RandomGeneratorI;

    constructor(
        timestamp: number,
        cafeteria: Cafeteria,
        machine: EventMachine,
        student: Student,
        randomGenerator: RandomGeneratorI
    ) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
        this.student = student;
        this.randomGenerator = randomGenerator;
    }

    processEvent(): void {
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Chegada de Estudante na Fila Externa`);
        this.cafeteria.addStudentToExternalQueue(this.student);
        console.log(`[INFO] Estudante ${this.student.getRegistration()} entrou na fila externa`);
        
        // Criar próximo evento para este estudante
        const registrationTime = this.student.getRegistrationTime();
        const nextEventTime = this.timestamp + registrationTime;
        
        const nextEvent = new GetOutFromExternalQueueToTheTurnstile(
            nextEventTime,
            this.cafeteria,
            this.machine,
            this.randomGenerator
        );
        
        this.machine.addEvent(nextEvent);
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}
