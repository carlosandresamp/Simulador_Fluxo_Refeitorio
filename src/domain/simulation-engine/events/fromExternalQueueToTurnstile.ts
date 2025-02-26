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
        console.log(`[${this.timestamp}] Processando movimento da fila externa para catraca`);

        if (this.cafeteria.moveStudentToTurnstile()) {
            const student = this.cafeteria.getTurnstile().getStudent();
            if (student) {
                student.setStatus("REGISTERING");
                const typingTime = student.simulateTypingTime();
                const nextEventTime = this.timestamp + typingTime;

                const nextEvent = new FromTurnstileToInternalQueue(
                    nextEventTime,
                    this.cafeteria,
                    this.machine
                );
                
                this.machine.addEvent(nextEvent);
                console.log(`${student.getRegistration()} está registrando matrícula na catraca.`);
            }
        } else {
            console.log("Não foi possível mover estudante para a catraca.");
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
} 