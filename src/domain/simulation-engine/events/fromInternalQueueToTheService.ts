import { Service } from "../system/service";
import { Student } from "../system/student";

export class FromInternalQueueToTheService {
    private internalQueue: Student[];

    constructor(private service: Service) {
        this.internalQueue = [];
    }

    addStudentToQueue(student: Student): void {
        student.setStatus("aguardando");
        this.internalQueue.push(student);
        console.log(`Aluno ${student.getRegister()} entrou na fila interna.`);
    }

    execute(): void {
        if (this.internalQueue.length > 0) {
            const student = this.internalQueue.shift(); // Retira o primeiro aluno da fila
            if (student) {
                student.setStatus("atendido");
                this.service.serveFood(); // Funcionário atende o aluno
                console.log(`Aluno ${student.getRegister()} está sendo atendido.`);
            }
        } else {
            console.log("Nenhum aluno na fila interna.");
        }
    }
}
