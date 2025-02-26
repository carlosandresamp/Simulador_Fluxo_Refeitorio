import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { FromTableToHome } from "./fromTableToHome";

export class FromServiceToTheTable implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Do Atendimento Para Mesa`);
        
        const service = this.cafeteria.getService();
        const hall = this.cafeteria.getHall();
        const currentStudent = service.getCurrentStudent();

        if (currentStudent && hall.hasAvailableTables()) {
            if (hall.addStudent(currentStudent, this.timestamp)) {
                service.clearCurrentStudent();
                
                const mealTime = 20;
                const instantFinishMeal = this.timestamp + mealTime;
                
                const nextEvent = new FromTableToHome(
                    instantFinishMeal,
                    this.cafeteria,
                    this.machine
                );
                this.machine.addEvent(nextEvent);
                console.log(`[INFO] Estudante ${currentStudent.getRegistration()} ocupou uma mesa`);
            }
        } else {
            console.log("[INFO] Não há estudante para ser servido ou mesas disponíveis");
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}
