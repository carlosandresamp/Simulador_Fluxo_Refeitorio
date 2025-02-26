import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { RandomGeneratorI } from "../util/random-generators";
import { FromTurnstileToInternalQueue } from "./fromTurnstileToInternalQueue";

export class FromExternalQueueToTurnstile implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;
    private randomGenerator: RandomGeneratorI;

    constructor(
        timestamp: number,
        cafeteria: Cafeteria,
        machine: EventMachine,
        randomGenerator: RandomGeneratorI
    ) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
        this.randomGenerator = randomGenerator;
    }

    processEvent(): void {
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Movimento da Fila Externa para Catraca`);
        
        const student = this.cafeteria.getExternalQueue().removeStudent();
        if (student) {
            console.log(`[INFO] Estudante ${student.getRegistration()} está registrando matrícula na catraca`);
            
            const registrationTime = student.getRegistrationTime();
            console.log(`[INFO] O estudante levará aproximadamente ${registrationTime.toFixed(2)} segundos para digitar a matrícula`);
            
            this.cafeteria.getTurnstile().registerStudent(student);
            console.log(`[INFO] Matrícula ${student.getRegistration()} registrada`);

            const nextEvent = new FromTurnstileToInternalQueue(
                this.timestamp + registrationTime,
                this.cafeteria,
                this.machine
            );
            this.machine.addEvent(nextEvent);
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
} 