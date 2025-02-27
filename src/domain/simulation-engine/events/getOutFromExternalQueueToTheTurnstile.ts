import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { GetOutFromTurnstileToTheInternalQueue } from "./getOutFromTurnstileToTheInternalQueue";

export class GetOutFromExternalQueueToTheTurnstile extends Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super()
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Saída da Fila Externa para Catraca`);
        
        const student = this.cafeteria.getExternalQueue().removeStudent();
        if (student) {

            this.cafeteria.getTurnstile().setStudent(student);
            console.log(`[INFO] Estudante ${student.getRegistration()} está registrando matrícula na catraca`);
            
            const registrationTime = student.getRegistrationTime();
            console.log(`[INFO] O estudante levou aproximadamente ${registrationTime.toFixed(2)} segundos para digitar a matrícula`);
            
            this.cafeteria.getTurnstile().registerStudent(student);
            console.log(`[INFO] Matrícula ${student.getRegistration()} registrada`);

            const nextEvent = new GetOutFromTurnstileToTheInternalQueue(
                this.timestamp,
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
