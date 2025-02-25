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
    }

    addStudentToQueue(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível adicionar estudantes à fila.");
            return;
        }
        this.serviceQueue.push(student);
        console.log(`Estudante ${student.getRegister()} foi adicionado à fila de atendimento.`);
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
        console.log(`Funcionário ${this.coWorkerName} servirá a comida para ${student.getRegister()} em aproximadamente ${serviceTime.toFixed(2)} segundos.`);

        setTimeout(() => {
            console.log(`Funcionário ${this.coWorkerName} terminou de servir a comida para ${student.getRegister()}.`);
            student.setStatus("atendido");
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
