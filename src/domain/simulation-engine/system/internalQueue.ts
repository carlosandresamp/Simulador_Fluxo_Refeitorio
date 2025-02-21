import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";

export class InternalQueue extends ExternalQueue {
  private maxCapacity: number;

  constructor(maxCapacity: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.maxCapacity = maxCapacity;
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
    const toRemoveStudent = super.removeStudent();
    console.log("Fila interna");
    return toRemoveStudent;
  }
}
