import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";

export class InternalQueue extends ExternalQueue {
  readonly maxCapacity: number;

  constructor(maxCapacity: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.maxCapacity = maxCapacity;
  }

  toAddStudent(student: Student): void {
    if(this.studentQuantity.length >= this.maxCapacity){
        throw new Error ("Fila interna cheia: espere esvaziar");
    }
    
    /*let gettinStudents: Student[] = this.studentQuantity;
    /*for (let i = 0; i < gettinStudents.length; i++) {
      countingStudents++;
      if (countingStudents > this.maxCapacity) {
        throw new Error("Fila interna cheia: espere esvaziar");
      }
    }*/

    this.studentQuantity.push(student);
    console.log("Aluno entrou na Fila Interna");
  }

  toRemoveStudent(): Student {
    const toRemoveStudent = super.toRemoveStudent();
    console.log("Fila interna");
    return toRemoveStudent;
  }
}
