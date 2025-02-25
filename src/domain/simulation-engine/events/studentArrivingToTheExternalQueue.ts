import { Student } from "../system/student";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
import { GetOutFromExternalQueueToTheTurnstile } from "./getOutFromExternalQueueToTheTurnstile";
import { RandomGeneratorI } from "../util/random-generators"; // Importa a interface das distribuições
import { FromExternalQueueToTurnstile } from "./fromExternalQueueToTurnstile";

export class StudentArrivingToTheExternalQueue extends Event {
    private student: Student;
    private randomGenerator: RandomGeneratorI; // Adiciona o gerador aleatório

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student, randomGenerator: RandomGeneratorI) {
        super(timestamp, cafeteria, machine);
        this.student = student;
        this.randomGenerator = randomGenerator; // Inicializa com o gerador selecionado
    }

    processEvent(): void {
        console.log(`Evento - Chegada de Estudante na Fila Externa - ${this.timestamp}`);
        
        this.cafeteria.addStudentToExternalQueue(this.student);
        
        // Agenda o próximo evento para mover o estudante para a catraca
        const nextEventTime = this.timestamp + 1; // 1 segundo de espera
        const nextEvent = new FromExternalQueueToTurnstile(
            nextEventTime,
            this.cafeteria,
            this.machine
        );
        this.machine.addEvent(nextEvent);
    }
}
