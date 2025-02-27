import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";
import { GetOutFromExternalQueueToTheTurnstile } from "./getOutFromExternalQueueToTheTurnstile";

export class GetOutFromTurnstileToTheInternalQueue extends Event {
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
        console.log(`[${this.timestamp.toFixed(2)}s] Evento: Saída da Catraca para Fila Interna`);
        
        const student = this.cafeteria.getTurnstile().getStudent();
        if(!student) {
            console.log("[ERRO] Catraca não possui aluno");
            return;
        }

        const removingStudentFromTurnstile = this.cafeteria.getTurnstile().removeStudent();
        if(!removingStudentFromTurnstile) {
            console.log("[INFO] Não foi possível remover o aluno da catraca");
            return;
        }

        const _enterInternalQueue = this.cafeteria.getInternalQueue().addStudent(student);
        if(!_enterInternalQueue) {
            console.log("[INFO] Aluno não pode entrar na fila interna");
            return;
        }

        console.log(`[INFO] Estudante ${student.getRegistration()} entrou na fila interna`);

        if(this.cafeteria.getInternalQueue().getStudents().length == this.cafeteria.getInternalQueue().getMaxCapacity()) {
            this.cafeteria.getTurnstile().blockTurnstile();
        }else{
            const nextEventTime = this.timestamp + this.cafeteria.getTurnstile().calculateRegisterTime();
            let newEvent = new GetOutFromExternalQueueToTheTurnstile(nextEventTime, this.cafeteria, this.machine);
            this.machine.addEvent(newEvent);
        }

        if(this.cafeteria.getInternalQueue().getStudents().length == 1) {
            const nextEventTime = this.timestamp + this.cafeteria.getTurnstile().calculateRegisterTime();
            let newEvent = new FromInternalQueueToTheService(nextEventTime, this.cafeteria, this.machine);
            this.machine.addEvent(newEvent);
        }
    }

    getTimestamp(): number {
        return this.timestamp;
    }
}