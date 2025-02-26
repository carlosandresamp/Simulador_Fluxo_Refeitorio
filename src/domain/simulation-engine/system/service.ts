import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';

export class Service {
    private employeeId: string;
    private employeeName: string;
    private averageServiceTime: number;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null = null;
    private serviceQueue: Student[] = []; 
    private isServiceBlocked: boolean = false;

    constructor() {
        this.employeeId = "EMP001";
        this.employeeName = "Default Employee";
        this.averageServiceTime = 5;
        this.randomGenerator = new GaussianRandom();
    }

    serveFood(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível atender estudantes.");
            return;
        }

        this.currentStudent = student;
        const serviceTime = this.calculateServiceTime();
        console.log(`Funcionário ${this.employeeName} serviu a comida para ${student.getRegistration()} em aproximadamente ${serviceTime.toFixed(2)} segundos.`);
        
        student.setStatus("EATING");
    }

    addStudentToQueue(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível adicionar estudantes à fila.");
            return;
        }
        this.serviceQueue.push(student);
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

    private calculateServiceTime(): number {
        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        return this.averageServiceTime * scaledFactor;
    }

    clearCurrentStudent(): void {
        this.currentStudent = null;
    }

    getServiceTime(): number {
        return this.calculateServiceTime();
    }
}
