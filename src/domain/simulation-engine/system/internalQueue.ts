import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";

export class InternalQueue extends ExternalQueue{
    private maxCapacity:number;

    constructor(maxCapacity:number, studentQuantity?:Student[]){
        super(studentQuantity);
        this.maxCapacity = maxCapacity;
    }

    getMaxCapacity(){
        return this.maxCapacity;
    }

    setMaxCapacity(maxCapacity:number){
        return this.maxCapacity=maxCapacity;
    }

    toAddStudent(student: Student): void {
        let countingStudents:number = 0;
        let gettinStudents:Student[] = this.studentQuantity;

        for(let i=0; i<gettinStudents.length; i++){
            countingStudents++;
            if(countingStudents > this.maxCapacity){
                throw new Error("Fila interna cheia: espere esvaziar");
            }
        }

        gettinStudents.push(student);
        console.log("Aluno entrou na Fila Interna");
    }

    toRemoveStudent(): Student {
        super.toRemoveStudent();
        console.log("Fila interna")
        return;
    }
}