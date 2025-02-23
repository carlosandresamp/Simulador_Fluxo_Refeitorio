import { Hall } from "../system/hall";
import { Student } from "../system/student";

export class FromServiceToTheTable {
    constructor(private hall: Hall) {}

    execute(student: Student): void {
        if (!student) {
            throw new Error("O aluno não pode ser nulo ou indefinido.");
        }

        if (this.hall.addStudent(student)) { 
            console.log(`Aluno ${student.getRegister()} foi para a mesa.`);
            student.setStatus("atendido");

            setTimeout(() => {
                this.hall.removeStudent(student); 
                student.setStatus("saindo");
                console.log(`Aluno ${student.getRegister()} terminou a refeição e está saindo.`);
            }, this.hall.getOccupationTime());
        } else {
            throw new Error("Nenhuma mesa disponível para o aluno.");
        }
    }
}