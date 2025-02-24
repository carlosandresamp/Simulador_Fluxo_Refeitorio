import { error } from "console";
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";

export class InternalQueue extends ExternalQueue {
  private maxCapacity: number;
  private sizeQueue: number;

  constructor(sizeQueue: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.sizeQueue = sizeQueue;
    this.maxCapacity = sizeQueue; 
  }

  getMaxCapacity(): number {
    return this.maxCapacity;
  }

  setMaxCapacity(maxCapacity: number): void { 
    this.maxCapacity = maxCapacity;
  }

  addStudent(student: Student): void {
    if (this.studentQuantity.length >= this.maxCapacity) {
      throw new Error("Fila interna cheia: espere esvaziar");
    }

    this.studentQuantity.push(student);
    console.log("Aluno entrou na Fila Interna");
  }

  removeStudent(): Student {
    if (this.studentQuantity.length === 0) {
      throw new Error("Fila Vazia: Não é possível remover estudantes.");
    }

    const toRemoveStudent = super.removeStudent();
    console.log("Aluno removido da Fila Interna");
    return toRemoveStudent;
  }

  emptyInternalQueue(): boolean {
    return this.studentQuantity.length === 0;
  }

  isInternalQueueFull(): boolean {
    return this.studentQuantity.length >= this.maxCapacity; 
  }

  isEmpty(): boolean {
    return this.studentQuantity.length === 0;
  }
}
