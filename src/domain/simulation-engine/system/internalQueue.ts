import { error } from "console";
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";

export class InternalQueue extends ExternalQueue {
  private maxCapacity: number;
  private sizeQueue:number;
  private middleWaitingTime:number;
  private randomGenerator = new GaussianRandom(); 

  constructor(sizeQueue: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.maxCapacity
    this.sizeQueue = sizeQueue
  }

  getMaxCapacity(){
    return this.maxCapacity;
  }

  setMaxCapacity(maxCapacity: number) {
    if (maxCapacity <= 0) throw new Error("A capacidade máxima deve ser maior que zero.");
    this.maxCapacity = maxCapacity;
  }

  setMiddleWaitingTime(middleWaitingTime: number) {
    if (middleWaitingTime <= 0) throw new Error("O tempo médio de espera deve ser maior que zero.");
    this.middleWaitingTime = middleWaitingTime;
  }

  addStudent(student: Student): void {
    if(this.studentQuantity.length >= this.maxCapacity){
        throw new Error ("Fila interna cheia: espere esvaziar");
    }

    this.studentQuantity.push(student);
    console.log("Aluno entrou na Fila Interna");
  }

  removeStudent(): Student | null {
    if (this.studentQuantity.length === 0) {
      throw new Error("Fila Vazia: Não é possível remover estudantes.");
    }

    const waitingTime = this.calculateWaitingTime();
    console.log(`Aluno aguardará aproximadamente ${waitingTime.toFixed(2)} segundos antes de ser atendido.`);

    // Simula a remoção do aluno após o tempo de espera
    setTimeout(() => {
      const toRemoveStudent = super.removeStudent();
      if (toRemoveStudent) {
        console.log(`Aluno ${toRemoveStudent.getRegister()} saiu da Fila Interna para o atendimento.`);
      }
    }, waitingTime * 1000);

    return null; 
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

  calculateWaitingTime():number{
    const variantionFactor = this.randomGenerator.next();
    const minFactor = 0.8;
    const maxFactor = 1.2;
    const scaledFactor = minFactor + variantionFactor * (maxFactor - minFactor);
    return this.middleWaitingTime * scaledFactor;
  }
}
