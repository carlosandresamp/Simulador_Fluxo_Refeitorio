import { error } from "console";
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";
import { throwDeprecation } from "process";
import { add } from "date-fns";
import { Student } from "./student";

//Classe de fila externa que recebe uma lista de alunos;
export class ExternalQueue {
  protected students: Student[];

  constructor(students?: Student[]) {
    this.students = students ?? [];
  }

  addStudent(student: Student): void {
    this.students.push(student);
    console.log(`Estudante ${student.getRegistration()} entrou na fila externa`);
  }

  removeStudent(): Student | null {
    if (this.isEmpty()) {
      console.log("Fila Externa Vazia: Não é possível remover estudantes.");
      return null;
    }

    const student = this.students.shift()!;
    console.log(`Estudante ${student.getRegistration()} saiu da fila externa`);
    return student;
  }

  isEmpty(): boolean {
    return this.students.length === 0;
  }

  getLength(): number {
    return this.students.length;
  }

  getStudents(): Student[] {
    return [...this.students];
  }
}
