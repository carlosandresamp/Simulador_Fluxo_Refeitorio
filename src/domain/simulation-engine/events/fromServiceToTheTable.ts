import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";

export class FromServiceToTheTable extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent() {
        console.log(`Evento - Do Atendimento Para a Mesa - ${this.timestamp}`);

        const service = this.cafeteria.getService();
        const hall = this.cafeteria.getHall();
        const currentStudent = service.getCurrentStudent();

        if (!currentStudent) {
            console.log("Nenhum estudante está sendo atendido.");
            return; 
        }

        if (hall.hasAvailableTables()) {
            
            const mealTime = 10; 
            const instantFinishMeal = this.timestamp + mealTime;
            setTimeout(() => {
                this.cafeteria.finishMeal(currentStudent);
                console.log(`${currentStudent.getRegister()} saiu da mesa para casa.`);

                if (hall.hasAvailableTables()) {
                    console.log("Atendimento desbloqueado.");
                }
            }, mealTime * 1000);
        } else {
            console.log("Não há mesas disponíveis para o aluno.");
        }
    }
}
