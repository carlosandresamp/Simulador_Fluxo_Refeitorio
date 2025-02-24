import { error } from "console";
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";

export class InternalQueue extends ExternalQueue {
  private maxCapacity: number;
  private sizeQueue:number;

  constructor(sizeQueue: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.maxCapacity
    this.sizeQueue = sizeQueue
  }

  getMaxCapacity(){
    return this.maxCapacity;
  }

  setMaxCapacity(maxCapacity:number){
    return this.maxCapacity = maxCapacity;
  }

  addStudent(student: Student): void {
    if(this.studentQuantity.length >= this.maxCapacity){
        throw new Error ("Fila interna cheia: espere esvaziar");
    }

    this.studentQuantity.push(student);
    console.log("Aluno entrou na Fila Interna");
  }

  removeStudent(): Student {
    if(this.studentQuantity.length == 0){
      throw new Error("Fila Vazia: Não é possível remover estudantes.");
    }

    const toRemoveStudent = super.removeStudent();
    console.log("Fila interna");
    return toRemoveStudent;
  }

  emptyInternalQueue():boolean{
    if(this.studentQuantity.length == 0){
      console.log("Fila interna Vazia.");
      return true;
    }
    return false;
  }

  isInternalQueueFull():Boolean{
    if(this.studentQuantity.length >= this.maxCapacity){
      console.log("A fila interna excedeu sua capacidade máxima.");
      return true;
    }
    return false;
  }
}
