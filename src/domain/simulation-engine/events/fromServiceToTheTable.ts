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

<<<<<<< HEAD
    processEvent(): void {
        console.log(`Evento- Fila Interna Para Atendimento - ${this.timestamp}`);
        
        const internalQueue = this.cafeteria.getInternalQueue();
        const studentInternalQueue = internalQueue.getNextStudent();
        if(!studentInternalQueue){
            throw new Error ("Nenhum estudante na fila para atendimento");
        }

        const serviceAvailable = this.cafeteria.getService().isServiceAvailable();
        if(!serviceAvailable){
            throw new Error ("Servico indisponivel");
        }

        const typingTime = studentInternalQueue.simulateTypingTime();
        const totalServiceTime = studentInternalQueue.servedTime + typingTime;

        studentInternalQueue.setStatus("Aguardando");

        console.log(`${studentInternalQueue.getRegister()} está sendo atendido após ${totalServiceTime.toFixed(2)} segundos de espera`);

        internalQueue.removeStudent();

        const instantCompletion = this.timestamp + totalServiceTime;
        const newEvent = new FromServiceToTheTable(instantCompletion,this.cafeteria, this.machine);
=======
    processEvent() {
        console.log(`Evento - Atendimento para Mesa - ${this.timestamp}`);

        // Verifica se há algum estudante sendo atendido na fila do serviço
        const studentAtService = this.cafeteria.getService().getNextStudent(); // Usando o método getService() correto
        if (!studentAtService) {
            throw new Error("Nenhum estudante para atendimento.");
        }

        // Verifica se a mesa está disponível
        const tableAvailable = this.cafeteria.getTable().isTableAvailable();
        if (!tableAvailable) {
            throw new Error("Mesa indisponível.");
        }

        // Simula o tempo de digitação do estudante antes de ele ser atendido
        const typingTime = studentAtService.simulateTypingTime();
        const totalServiceTime = studentAtService.servedTime + typingTime;

        // Atualiza o status do estudante
        studentAtService.setStatus("atendido");
        console.log(`${studentAtService.getRegister()} foi atendido e está indo para a mesa após ${totalServiceTime.toFixed(2)} segundos.`);

        // Agenda o evento para o estudante sair para a mesa após o atendimento
        const instantCompletion = this.timestamp + totalServiceTime;
        const newEvent = new FromInternalQueueToTheService(instantCompletion, this.cafeteria, this.machine); // Chamando o evento correto
>>>>>>> ce246cc86aecbf53270cf5481ef77f23e8d0db8d
        this.machine.addEvent(newEvent);
    }
}
