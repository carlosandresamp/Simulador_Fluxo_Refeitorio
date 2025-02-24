import { Event } from './event';
import { Cafeteria } from '../system/cafeteria';
import { EventMachine } from './eventMachine';
import { Student } from '../system/student';
import { InternalQueue } from '../system/internalQueue';
import { Service } from '../system/service';

export class FromInternalQueueToTheService extends Event {
    private internalQueue: InternalQueue;
    private service: Service;

    constructor(
        timestamp: number,
        cafeteria: Cafeteria,
        machine: EventMachine,
        internalQueue: InternalQueue,
        service: Service
    ) {
        super(timestamp, cafeteria, machine);

        this.internalQueue = internalQueue;
        this.service = service;
    }

    processEvent(): void {
        if (this.internalQueue.isEmpty()) {
            throw new Error("A fila interna está vazia. Nenhum aluno para servir.");
        }

        const student = this.internalQueue.removeStudent();
        if (!student) {
            throw new Error("Falha ao remover o aluno da fila interna.");
        }

        student.setStatus("atendido");
        student.serviceTime = new Date();
        this.service.serveFood(student);
        console.log(`Aluno ${student.getRegister()} foi movido da fila interna para o atendimento.`);
    }
}
