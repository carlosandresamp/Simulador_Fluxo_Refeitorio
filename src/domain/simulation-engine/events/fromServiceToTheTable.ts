import { Hall } from "../system/hall";
import { Student } from "../system/student";

export class FromServiceToTheTable {
    constructor(private hall: Hall) {}

    execute(student: Student): void {
        if (this.hall.hasAvailableTables()) {
            console.log(`Aluno ${student.getRegister()} foi para a mesa.`);
            student.setStatus("atendido");
            this.hall.occupyTable();

            setTimeout(() => {
                this.hall.releaseTable();
                student.setStatus("saindo");
                console.log(`Aluno ${student.getRegister()} terminou a refeição e está saindo.`);
            }, 5000);
        } else {
            console.log("Nenhuma mesa disponível.");
        }
    }
}
