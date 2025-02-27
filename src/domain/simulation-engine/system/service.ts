import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';

export class Service {
    private employeeId: string;
    private employeeName: string;
    private middleTimeService: number;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null = null;
    private serviceQueue: Student[] = []; 
    private isServiceBlocked: boolean;

    constructor() {
        this.employeeId = "EMP001";
        this.employeeName = "Default Employee";
        this.middleTimeService = 5;
        this.randomGenerator = new GaussianRandom();
        this.isServiceBlocked = true;
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

    setServiceCurrentlyBlocked(isBlocked: boolean): boolean {
        return this.isServiceBlocked = isBlocked;
    }

    private calculateServiceTime(): number {
        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        return this.middleTimeService * scaledFactor;
    }

    clearCurrentStudent(): void {
        this.currentStudent = null;
    }

    getServiceTime(): number {
        return this.calculateServiceTime();
    }

    setMiddleTimeService(time: number): void {
        this.middleTimeService = time;
    }
}
