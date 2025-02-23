import { Service } from "../system/service";
import { Student } from "../system/student";

export class FromInternalQueueToTheService {
    private internalQueue: Student[];

    constructor(private service: Service) {
        this.internalQueue = [];
    }

    addStudentToQueue(student: Student): void {
        if (!student) {
            throw new Error("Não é possível adicionar um aluno nulo à fila interna.");
        }
        
        student.setStatus("aguardando");
        this.internalQueue.push(student);
        console.log(`Aluno ${student.getRegister()} entrou na fila interna.`);
    }

    execute(): void {
        if (this.internalQueue.length === 0) {
            throw new Error("Nenhum aluno na fila interna para ser atendido.");
        }

        const student = this.internalQueue.shift();
        if (student) {
            student.setStatus("atendido");
            this.service.serveFood();
            console.log(`Aluno ${student.getRegister()} está sendo atendido.`);
        }
    }
}