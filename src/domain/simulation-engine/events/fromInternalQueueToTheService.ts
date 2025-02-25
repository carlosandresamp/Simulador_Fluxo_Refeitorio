import { Event } from './event';
import { Cafeteria } from '../system/cafeteria';
import { EventMachine } from './eventMachine';
import { Student } from '../system/student';
import { InternalQueue } from '../system/internalQueue';
import { Service } from '../system/service';
import { FromServiceToTheTable } from './fromServiceToTheTable';

export class FromInternalQueueToTheService extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        console.log(`Evento - Fila Interna para Atendimento - ${this.timestamp}`);

        //Verificar se a fila interna está vazia
        const internalQueue = this.cafeteria.getInternalQueue();
        const studentInternalQueue = internalQueue.geNextStudent();
        if(!studentInternalQueue){
            throw new Error("Nenhum estudante na fila interna para atendimento");
        }

        //Verificar se o serviço está disponível
        const serviceAvailable = this.cafeteria.getService().isServiceAvailable();
        if(!serviceAvailable){
            this.cafeteria.getService().isServiceAvailable();
        }

        //Simula o tempo de digitação do estudante antes de ele ser atendido
        const typingTime = studentInternalQueue.simulateTypingTime();
        const totalServiceTime = studentInternalQueue.servedTime + typingTime;

        //Atualiza o status do estudante para "Aguardando" enquanto ele está sendo atendido
        studentInternalQueue.setStatus("Aguardando.");

        console.log(`${studentInternalQueue.getRegister()} está sendo atendido após ${totalServiceTime.toFixed(2)} segundos de espera.`);

        //Remove o estudante da fila interna
        internalQueue.removeStudent();

        //Agenda o evento para o estudante ir para a mesa após o atendimento
        const instantCompletion = this.timestamp + totalServiceTime;
        const newEvent = new FromServiceToTheTable(instantCompletion, this.cafeteria, this.machine);
        this.machine.addEvent(newEvent);
    }
}
