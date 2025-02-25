import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { FromServiceToTheTable } from "./fromServiceToTheTable";

export class FromTableToHome extends Event{

    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student){
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent():void{
        console.log(`Evento - Da mesa para casa - ${this.student.getRegister()} - terminou a refeição e liberou a mesa`);
        this.cafeteria.finishMeal(this.student);

        const service = this.cafeteria.getService();
        if(service && !service.isServiceCurrentlyBlocked() && !service.isServiceQueueEmpty()){
                const scheduling = new FromServiceToTheTable(this.timestamp, this.cafeteria, this.machine);
                this.machine.addEvent(scheduling);
            }
        }
    }