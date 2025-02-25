import { Event } from "./event";
import { FromTurnstileToInternalQueue } from "./fromTurnstileToInternalQueue";

export class FromExternalQueueToTurnstile extends Event {
    processEvent(): void {
        console.log(`Evento - Da Fila Externa Para a Catraca - ${this.timestamp}`);

        if (this.cafeteria.moveStudentToTurnstile()) {
            const student = this.cafeteria.getTurnstile().getStudent();
            if (student) {
                const typingTime = student.simulateTypingTime();
                const nextEventTime = this.timestamp + typingTime;
                
                const nextEvent = new FromTurnstileToInternalQueue(
                    nextEventTime,
                    this.cafeteria,
                    this.machine
                );
                this.machine.addEvent(nextEvent);
            }
        }
    }
} 