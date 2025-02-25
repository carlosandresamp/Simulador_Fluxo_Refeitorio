import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";

export class FromTableToHome implements Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    processEvent(): void {
        console.log(`Evento - Da Mesa Para Casa - ${this.timestamp}`);
        
        const hall = this.cafeteria.getHall();
        const students = hall.getStudents();

        if (students.length > 0) {
            const student = students[0];
            this.cafeteria.finishMeal(student, this.timestamp);
            console.log(`${student.getMatricula()} terminou a refeição e está saindo.`);
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}