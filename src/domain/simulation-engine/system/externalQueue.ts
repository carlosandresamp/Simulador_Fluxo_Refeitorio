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

  addStudent(student: Student):void {
    this.studentQuantity.push(student);
    console.log("Novo aluno chegou a fila!");
  }

  removeStudent(): Student {
    if (this.studentQuantity.length === 0) {
      throw new Error("Não há alunos na fila");
    }

    //Remove aluno pelo conceito de FIFO através do método shift;
    const studentIndex = this.studentQuantity.shift();
    console.log("Aluno saiu da fila externa.");
    return studentIndex;
  }

  emptyQueue():boolean{
    if(this.studentQuantity.length == 0){
      console.log("Fila externa Vazia.");
      return true;
    }else{
      console.log("Há pessoas na fila")
      return false;
    }
  }
}
