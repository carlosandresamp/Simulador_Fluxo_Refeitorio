import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { InternalQueue } from "../system/internalQueue";
import { FromServiceToTheTable } from "./fromServiceToTheTable"; // Certifique-se de importar a classe correta

export class FromInternalQueueToTheService extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent() {
        console.log(`Evento - Fila Interna Para Atendimento - ${this.timestamp}`);

        // Verificar se a fila interna está vazia
        const internalQueue = this.cafeteria.getInternalQueue();
        const studentInInternalQueue = internalQueue.getNextStudent(); // Método que retorna o próximo aluno da fila interna
        if (!studentInInternalQueue) {
            throw new Error("Nenhum estudante na fila interna para atendimento.");
        }

        // Verificar se o serviço está disponível
        const serviceAvailable = this.cafeteria.getService().isServiceAvailable();
        if (!serviceAvailable) {
            throw new Error("Serviço indisponível.");
        }

        // Simulando o tempo de digitação do estudante antes de ele ser atendido
        const typingTime = studentInInternalQueue.simulateTypingTime();
        const totalServiceTime = studentInInternalQueue.servedTime + typingTime;

        // Atualizando o status do estudante para "aguardando" enquanto ele está sendo atendido
        studentInInternalQueue.setStatus("aguardando");

        console.log(`${studentInInternalQueue.getRegister()} está sendo atendido após ${totalServiceTime.toFixed(2)} segundos de espera.`);

        // Remover o estudante da fila interna
        internalQueue.removeStudent();

        // Agendando o evento para o estudante ir para a mesa após o atendimento
        const instantCompletion = this.timestamp + totalServiceTime;
        const newEvent = new FromServiceToTheTable(instantCompletion, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}
