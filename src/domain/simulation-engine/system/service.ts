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

        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        const serviceTime = this.averageServiceTime * scaledFactor;

        this.currentStudent = student;
        student.setStatus("BEING_SERVED");
        console.log(`Funcionário ${this.employeeName} servirá a comida para ${student.getRegistration()} em aproximadamente ${serviceTime.toFixed(2)} segundos.`);

        setTimeout(() => {
            console.log(`Funcionário ${this.employeeName} terminou de servir a comida para ${student.getRegistration()}.`);
            student.setStatus("EATING");
            this.currentStudent = null;

            if (!this.isServiceQueueEmpty()) {
                const nextStudent = this.getNextStudent();
                if (nextStudent) {
                    this.serveFood(nextStudent);
                }
            }
        }, serviceTime * 1000);
    }

    addStudentToQueue(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível adicionar estudantes à fila.");
            return;
        }
        this.serviceQueue.push(student);
        console.log(`Estudante ${student.getRegistration()} foi adicionado à fila de atendimento.`);
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

    set middleTimeService(time: number) {
        this.averageServiceTime = time;
    }

    get middleTimeService(): number {
        return this.averageServiceTime;
    }
}
