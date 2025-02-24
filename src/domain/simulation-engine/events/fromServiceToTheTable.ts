import { Event } from './event';
import { Cafeteria } from '../system/cafeteria';
import { EventMachine } from './eventMachine';
import { Student } from '../system/student';
import { Service } from '../system/service';
import { Hall } from '../system/hall';

export class FromServiceToTheTable extends Event {
    private service: Service;
    private hall: Hall;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, service: Service, hall: Hall) {
        super(timestamp, cafeteria, machine);
        this.service = service;
        this.hall = hall;
    }

    processEvent(): void {
        const student = this.service.getCurrentStudent(); // Obtém o estudante atual
        if (!student) {
            throw new Error("Nenhum aluno está atualmente sendo servido.");
        }

        if (!this.hall.addStudent(student)) {
            throw new Error("Salão está cheio. Não pode adicionar aluno à mesa.");
        }

        student.setStatus("saindo");
        student.servedTime = new Date();
        console.log(`Aluno ${student.getRegister()} foi movido de serviço para mesa.`);
    }
}