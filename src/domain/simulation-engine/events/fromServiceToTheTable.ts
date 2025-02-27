import { ftruncate } from "fs";
import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { FromTableToHome } from "./fromTableToHome";
import { GetOutFromTurnstileToTheInternalQueue } from "./getOutFromTurnstileToTheInternalQueue";

export class FromServiceToTheTable extends Event {
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
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Do Atendimento Para Mesa`);
        
        const service = this.cafeteria.getService();
        const currentStudent = service.getCurrentStudent();

        if(!this.cafeteria.getHall().hasAvailableTables) {
            this.cafeteria.getService().setServiceCurrentlyBlocked(true);
            console.log("Serviço bloqueado");
          
        
        }else{
            const currentStudent = this.cafeteria.getService().getCurrentStudent();
            this.cafeteria.getService().setServiceCurrentlyBlocked(false);
            this.cafeteria.getInternalQueue().removeStudent();
            this.cafeteria.getService().serveFood(currentStudent);
            
            const turnstileEvent = new GetOutFromTurnstileToTheInternalQueue(this.timestamp, this.cafeteria, this.machine);
            this.machine.addEvent(turnstileEvent);
            console.log("Catraca desbloqueada");

        }
        
        const mealTime = 20;
        const instantFinishMeal = this.timestamp + mealTime;

        const nextEvent = new FromTableToHome(
            instantFinishMeal,
            this.cafeteria,
            this.machine
        );
        this.machine.addEvent(nextEvent);
        console.log(`[INFO] Estudante ${currentStudent.getRegistration()} ocupou uma mesa`);
        
        // if (currentStudent && hall.hasAvailableTables()) {
            //     if (hall.addStudent(currentStudent, this.timestamp)) {
                //         service.clearCurrentStudent();
                
        //         const mealTime = 20;
        //         const instantFinishMeal = this.timestamp + mealTime;
                
        //     }
        // } else {
        //     console.log("[INFO] Não há estudante para ser servido ou mesas disponíveis");
        // }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}
