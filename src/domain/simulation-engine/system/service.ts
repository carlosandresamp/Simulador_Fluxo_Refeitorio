import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';

export class Service {
    private coWorkerRegister: string;
    private coWorkerName: string;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null = null;
    private serviceQueue: Student[] = []; 
    public middleTimeService: number;
    private isServiceBlocked: boolean = false; 

    constructor() {
        this.randomGenerator = new GaussianRandom();
        this.middleTimeService = 0;
    }

    addStudentToQueue(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível adicionar estudantes à fila.");
            return;
        }
        this.serviceQueue.push(student);
        console.log(`Estudante ${student.getMatricula()} foi adicionado à fila de atendimento.`);
    }

    serveFood(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível atender estudantes.");
            return;
        }

        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        const serviceTime = this.middleTimeService * scaledFactor;

        this.currentStudent = student;
        console.log(`Funcionário ${this.coWorkerName} servirá a comida para ${student.getMatricula()} em aproximadamente ${serviceTime.toFixed(2)} segundos.`);

        setTimeout(() => {
            console.log(`Funcionário ${this.coWorkerName} terminou de servir a comida para ${student.getMatricula()}.`);
            student.setStatus("IN_SERVICE");
            this.currentStudent = null;

            if (!this.isServiceQueueEmpty()) {
                const nextStudent = this.getNextStudent();
                if (nextStudent) {
                    this.serveFood(nextStudent);
                }
            }
        }, serviceTime * 1000);
    }

    getCurrentStudent(): Student | null {
        return this.currentStudent;
    }

    getNextStudent(): Student | null {
        if (this.serviceQueue.length > 0) {
            return this.serviceQueue.shift() || null;
        }
        return null;
    }
    
    isServiceQueueEmpty(): boolean {
        return this.serviceQueue.length === 0;
    }

    unblockService(): void {
        this.isServiceBlocked = false;
        console.log("Serviço desbloqueado.");
    }

    isServiceCurrentlyBlocked(): boolean {
        return this.isServiceBlocked;
    }
}

export class Atendimento {
    private idFuncionario: string;
    private nomeFuncionario: string;
    private tempoMedioServir: number;
    private estudanteAtual: Student | null;

    constructor(idFuncionario: string, nomeFuncionario: string, tempoMedioServir: number) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
        this.tempoMedioServir = tempoMedioServir;
        this.estudanteAtual = null;
    }

    servirComida(estudante: Student): void {
        this.estudanteAtual = estudante;
        estudante.setStatus("IN_SERVICE");
        console.log(`Funcionário ${this.nomeFuncionario} está servindo ${estudante.getMatricula()}`);
    }

    finalizarAtendimento(): Student | null {
        const estudante = this.estudanteAtual;
        if (estudante) {
            estudante.setStatus("SERVED");
            this.estudanteAtual = null;
        }
        return estudante;
    }

    getTempoMedioServir(): number {
        return this.tempoMedioServir;
    }
}
