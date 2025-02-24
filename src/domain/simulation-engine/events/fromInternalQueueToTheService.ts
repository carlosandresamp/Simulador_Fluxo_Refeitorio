import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { InternalQueue } from "../system/internalQueue";
import { FromServiceToTheTable } from "./fromServiceToTheTable";

export class FromInternalQueueToTheService extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent() {
        console.log(`Evento - Fila Interna Para Atendimento - ${this.timestamp}`);

        // Acessa a fila interna
        const internalQueue = this.cafeteria.getInternalQueue();

        // Verifica se há estudantes na fila interna
        if (internalQueue.emptyInternalQueue()) {
            console.log("Nenhum estudante na fila interna para atendimento.");
            return; // Se a fila estiver vazia, não há nada para processar
        }

        // Calcula o tempo de espera do estudante
        const totalServiceTime = internalQueue.calculateWaitingTime();

        // Remove o estudante da fila interna
        const studentInInternalQueue = internalQueue.removeStudent();
        if (!studentInInternalQueue) {
            console.log("Erro ao remover aluno da fila interna.");
            return;
        }

        // Atualiza o status do estudante
        studentInInternalQueue.setStatus("aguardando");
        console.log(`${studentInInternalQueue.getRegister()} está sendo atendido após ${totalServiceTime.toFixed(2)} segundos de espera.`);

        // Agenda o evento para o estudante ir para a mesa após o atendimento
        const instantCompletion = this.timestamp + totalServiceTime;
        const newEvent = new FromServiceToTheTable(instantCompletion, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}
