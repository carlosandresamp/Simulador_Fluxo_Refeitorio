import { Event } from './event';
import { Cafeteria } from '../system/cafeteria';
import { EventMachine } from './eventMachine';
import { Student } from '../system/student';
import { Service } from '../system/service';
import { Hall } from '../system/hall';

export class FromServiceToTheTable extends Event {
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

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
        this.machine.addEvent(newEvent);
    }
}