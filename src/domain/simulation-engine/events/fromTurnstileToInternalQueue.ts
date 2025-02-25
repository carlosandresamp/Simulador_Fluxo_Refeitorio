import { Event } from "./event";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";

export class FromTurnstileToInternalQueue extends Event {
    processEvent(): void {
        console.log(`Evento - Da Catraca Para a Fila Interna - ${this.timestamp}`);

        if (this.cafeteria.moveStudentToInternalQueue()) {
            const nextEventTime = this.timestamp + 1; // 1 segundo de espera
            const nextEvent = new FromInternalQueueToTheService(
                nextEventTime,
                this.cafeteria,
                this.machine
            );
            this.machine.addEvent(nextEvent);
        }
    }
} 