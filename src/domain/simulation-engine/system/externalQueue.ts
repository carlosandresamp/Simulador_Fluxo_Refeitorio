import { error } from "console";
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";
import { throwDeprecation } from "process";
import { add } from "date-fns";
import { Student } from "./student";

//Classe de fila externa que recebe uma lista de alunos;
export class ExternalQueue {
  protected studentQuantity: Student[];

  constructor(studentQuantity?: Student[]) {
    this.studentQuantity = studentQuantity ?? []; //Assegura que o array sempre será um valor válido;
  }

  addStudent(student: Student): void {
    this.studentQuantity.push(student);
    student.setStatus("WAITING");
    console.log(`Estudante ${student.getMatricula()} entrou na fila externa`);
  }

  removeStudent(): Student {
    if (this.studentQuantity.length === 0) {
      throw new Error("Não há alunos na fila");
    }
    const student = this.studentQuantity.shift()!;
    console.log(`Estudante ${student.getMatricula()} saiu da fila externa`);
    return student;
  }

  emptyExternalQueue(): boolean {
    return this.studentQuantity.length === 0;
  }

  getLength(): number {
    return this.studentQuantity.length;
  }
}
