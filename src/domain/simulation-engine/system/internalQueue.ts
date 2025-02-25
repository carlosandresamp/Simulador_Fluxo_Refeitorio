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
    this.maxCapacity = sizeQueue;
    this.sizeQueue = sizeQueue;
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
    if (this.studentQuantity.length >= this.maxCapacity) {
      console.log("Fila interna cheia: espere esvaziar");
      return false;
    }

    this.studentQuantity.push(student);
    console.log(`Aluno ${student.getMatricula()} entrou na Fila Interna`);
    return true;
  }

  removeStudent(): Student | null {
    if (this.studentQuantity.length === 0) {
      console.log("Fila Vazia: Não é possível remover estudantes.");
      return null;
    }

    const student = super.removeStudent();
    if (student) {
      console.log(`Aluno ${student.getMatricula()} saiu da Fila Interna para o atendimento.`);
    }
    return student;
  }

  emptyInternalQueue():boolean{
    if(this.studentQuantity.length == 0){
      console.log("Fila interna Vazia.");
      return true;
    }
    return false;
  }

  isInternalQueueFull(): boolean {
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

  getLastStudent(): Student | null {
    if (this.studentQuantity.length === 0) {
      return null;
    }
    return this.studentQuantity[this.studentQuantity.length - 1];
  }
}

export class FilaInterna {
    private capacidadeMaxima: number;
    private estudantes: Student[];

    constructor(capacidadeMaxima: number) {
        this.capacidadeMaxima = capacidadeMaxima;
        this.estudantes = [];
    }

    adicionarEstudante(estudante: Student): void {
        if (this.estudantes.length >= this.capacidadeMaxima) {
            throw new Error("Capacidade máxima da fila interna atingida");
        }
        this.estudantes.push(estudante);
        estudante.setStatus("IN_QUEUE");
    }

    removerAluno(): Student | null {
        if (this.estudantes.length === 0) {
            return null;
        }
        return this.estudantes.shift()!;
    }

    getCapacidadeMaxima(): number {
        return this.capacidadeMaxima;
    }

    estaVazia(): boolean {
        return this.estudantes.length === 0;
    }

    estaCheia(): boolean {
        return this.estudantes.length >= this.capacidadeMaxima;
    }
}