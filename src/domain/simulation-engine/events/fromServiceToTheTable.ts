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
        console.log(`Evento - Do Atendimento Para Mesa - ${this.timestamp}`);
        
        const service = this.cafeteria.getService();
        const hall = this.cafeteria.getHall();
        const currentStudent = service.getCurrentStudent();

        if (currentStudent && hall.hasAvailableTables()) {
            if (hall.adicionarAluno(currentStudent, this.timestamp)) {
                const mealTime = 20; // Tempo fixo para refeição
                const instantFinishMeal = this.timestamp + mealTime;
                
                const nextEvent = new FromTableToHome(
                    instantFinishMeal,
                    this.cafeteria,
                    this.machine
                );
                this.machine.addEvent(nextEvent);
                console.log(`${currentStudent.getMatricula()} ocupou uma mesa.`);
            }
        } else {
            console.log("Não há estudante para ser servido ou mesas disponíveis.");
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}
