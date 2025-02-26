import { error } from "console";
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";

export class InternalQueue extends ExternalQueue {
  private maxCapacity: number;
  private sizeQueue:number;
  private middleWaitingTime:number;
  private randomGenerator = new GaussianRandom(); 

  constructor(maxCapacity: number, students?: Student[]) {
    super(students);
    this.maxCapacity = maxCapacity;
    this.sizeQueue = maxCapacity;
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

  addStudent(student: Student): boolean {
    if (this.students.length >= this.maxCapacity) {
      console.log("Fila interna cheia: espere esvaziar");
      return false;
    }

    this.students.push(student);
    console.log(`Estudante ${student.getRegistration()} entrou na Fila Interna`);
    return true;
  }

  removeStudent(): Student | null {
    if (this.isEmpty()) {
      console.log("Fila Interna Vazia: Não é possível remover estudantes.");
      return null;
    }

    const student = super.removeStudent();
    if (student) {
      console.log(`Estudante ${student.getRegistration()} saiu da Fila Interna para o atendimento.`);
    }
    return student;
  }

  emptyInternalQueue():boolean{
    if(this.students.length == 0){
      console.log("Fila interna Vazia.");
      return true;
    }
    return false;
  }

  isFull(): boolean {
    return this.students.length >= this.maxCapacity;
  }

  calculateWaitingTime():number{
    const variantionFactor = this.randomGenerator.next();
    const minFactor = 0.8;
    const maxFactor = 1.2;
    const scaledFactor = minFactor + variantionFactor * (maxFactor - minFactor);
    return this.middleWaitingTime * scaledFactor;
  }

  getLastStudent(): Student | null {
    if (this.students.length === 0) {
      return null;
    }
    return this.students[this.students.length - 1];
  }

  isEmpty(): boolean {
    return this.students.length === 0;
  }
}