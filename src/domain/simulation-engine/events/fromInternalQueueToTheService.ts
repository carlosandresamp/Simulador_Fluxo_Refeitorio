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

        // Verifica se há estudantes na fila interna
        if (internalQueue.emptyInternalQueue()) {
            console.log("Nenhum estudante na fila interna para atendimento.");
            return; // Se a fila estiver vazia, não há nada para processar
        }

        // Verifica se o atendimento está disponível
        if (service.isServiceQueueEmpty() && hall.hasAvailableTables()) {
            // Remove o estudante da fila interna
            const studentInInternalQueue = internalQueue.removeStudent();
            if (!studentInInternalQueue) {
                console.log("Erro ao remover aluno da fila interna.");
                return;
            }

            // Atualiza o status do estudante
            studentInInternalQueue.setStatus("atendido");
            console.log(`${studentInInternalQueue.getRegister()} está sendo atendido.`);

            // Serve o estudante
            service.serveFood(studentInInternalQueue);

            // Agenda o evento para o estudante ir para a mesa após o atendimento
            const serviceTime = service.middleTimeService; // Tempo médio de serviço
            const instantCompletion = this.timestamp + serviceTime;
            const newEvent = new FromServiceToTheTable(instantCompletion, this.cafeteria, this.machine);
            this.machine.addEvent(newEvent);
        } else {
            console.log("Atendimento não disponível ou não há mesas disponíveis.");
        }
    }
}