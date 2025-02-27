import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";

export class FromTableToHome extends Event {
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
        // Exibir o timestamp em segundos com duas casas decimais
        console.log(`Evento - Da Mesa Para Casa - ${this.timestamp.toFixed(2)} segundos`);
        
        const hall = this.cafeteria.getHall();
        const students = hall.getStudents();

        const currentStudentEating = this.cafeteria.getHall().currentStudentEating();
        if(currentStudentEating){{
            this.cafeteria.finishMeal(currentStudentEating);
            this.cafeteria.getHall().removeStudent(currentStudentEating);
            this.cafeteria.getService().setServiceCurrentlyBlocked(false);
            console.log(`${currentStudentEating.getRegistration()} terminou a refeição e está saindo.`);
        }
    }

    // getTimestamp():number {
    //     return this.timestamp;
    // }
}
}