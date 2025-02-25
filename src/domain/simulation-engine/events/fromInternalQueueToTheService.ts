import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { FromServiceToTheTable } from "./fromServiceToTheTable";

export class FromInternalQueueToTheService extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent() {
        console.log(`Evento - Fila Interna Para Atendimento - ${this.timestamp}`);

        const internalQueue = this.cafeteria.getInternalQueue();
        const service = this.cafeteria.getService();
        const hall = this.cafeteria.getHall();

        if (internalQueue.emptyInternalQueue()) {
            console.log("Nenhum estudante na fila interna para atendimento.");
            return;
        }

        if (service.isServiceQueueEmpty() && hall.hasAvailableTables()) {
            const studentInInternalQueue = internalQueue.removeStudent();
            if (!studentInInternalQueue) {
                console.log("Erro ao remover aluno da fila interna.");
                return;
            }

            studentInInternalQueue.setStatus("atendido");
            console.log(`${studentInInternalQueue.getRegister()} está sendo atendido.`);

            service.serveFood(studentInInternalQueue);
            
            const serviceTime = service.middleTimeService;
            const instantCompletion = this.timestamp + serviceTime;
            const newEvent = new FromServiceToTheTable(instantCompletion, this.cafeteria, this.machine);
            this.machine.addEvent(newEvent);
        } else {
            console.log("Atendimento não disponível ou não há mesas disponíveis.");
        }
    }
}
