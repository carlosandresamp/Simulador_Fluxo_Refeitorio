import { Cafeteria } from "../system/cafeteria";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Student } from "../system/student";
import { InternalQueue } from "../system/internalQueue";
import { FromInternalQueueToTheService } from "./fromInternalQueueToTheService";

export class FromServiceToTheTable extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent() {
        console.log(`Evento - Atendimento para Mesa - ${this.timestamp}`);

        // Acessa o aluno sendo atendido
        const serviceQueue = this.cafeteria.getService().getServiceQueue();
        const studentAtService = serviceQueue[0]; // Assume-se que o primeiro aluno é o atendido
        if (!studentAtService) {
            console.log("Nenhum estudante sendo atendido no momento.");
            return; // Se não houver estudante sendo atendido, o evento não será processado
        }

        // Verifica se a mesa está disponível
        const tableAvailable = this.cafeteria.isTableAvailable(); // Método para verificar disponibilidade
        if (!tableAvailable) {
            console.log("Mesa indisponível.");
            return; // Se a mesa não estiver disponível, o evento não será processado
        }

        // Simula o tempo de digitação do estudante antes de ir para a mesa
        const typingTime = studentAtService.simulateTypingTime();
        const totalServiceTime = studentAtService.servedTime + typingTime;

        // Atualiza o status do estudante
        studentAtService.setStatus("atendido");
        console.log(`${studentAtService.getRegister()} foi atendido e está indo para a mesa após ${totalServiceTime.toFixed(2)} segundos.`);

        // Agenda o evento para o estudante sair para a mesa após o atendimento
        const instantCompletion = this.timestamp + totalServiceTime;
        const newEvent = new FromInternalQueueToTheService(instantCompletion, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}
