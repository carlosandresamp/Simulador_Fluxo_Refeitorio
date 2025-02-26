import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { FromServiceToTheTable } from "./fromServiceToTheTable";

export class FromInternalQueueToTheService implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`Evento - Fila Interna Para Atendimento - ${this.timestamp}`);

        const internalQueue = this.cafeteria.getInternalQueue();
        const service = this.cafeteria.getService();
        const hall = this.cafeteria.getHall();

        if (internalQueue.emptyInternalQueue()) {
            console.log("Nenhum estudante na fila interna para atendimento.");
            return;
        }

        if (service.isServiceQueueEmpty() && hall.hasAvailableTables()) {
            const student = internalQueue.removeStudent();
            if (student) {
                service.addStudentToQueue(student);
                service.serveFood(student);
                
                const serviceTime = service.middleTimeService;
                const nextEventTime = this.timestamp + serviceTime;
                
                const nextEvent = new FromServiceToTheTable(
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
