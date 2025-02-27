import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { FromServiceToTheTable } from "./fromServiceToTheTable";

export class FromInternalQueueToTheService extends Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super();
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Fila Interna Para Atendimento`);

        const internalQueue = this.cafeteria.getInternalQueue();
        const service = this.cafeteria.getService();
        const hall = this.cafeteria.getHall();

        if (!internalQueue.isEmpty() && service.isServiceQueueEmpty() && hall.hasAvailableTables()) {
            const student = internalQueue.removeStudent();
            if (student) {
                service.addStudentToQueue(student);
                console.log(`[INFO] Estudante ${student.getRegistration()} está sendo atendido`);
                service.serveFood(student);
                
                const nextEvent = new FromServiceToTheTable(
                    this.timestamp + service.getServiceTime(),
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
