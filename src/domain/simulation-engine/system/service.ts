import { Student } from './student';
import { GaussianRandom, RandomGeneratorI } from '../util/random-generators';

export class Service {
    private coWorkerRegister: string;
    private coWorkerName: string;
    private middleTimeService: number;
    private randomGenerator:GaussianRandom;
    private currentStudent: Student | null = null;

    constructor(coWorkerRegister?: string, coWorkerName?: string, middleTimeService?: number) {
        if (!coWorkerRegister) {
            throw new Error("O registro do funcionário não pode ser vazio.");
        }
        if (!coWorkerName) {
            throw new Error("O nome do funcionário não pode ser vazio.");
        }
        if (middleTimeService <= 0) {
            throw new Error("O tempo médio de serviço deve ser um número positivo.");
        }

        this.coWorkerRegister = coWorkerRegister;
        this.coWorkerName = coWorkerName;
        this.middleTimeService = middleTimeService;
        this.middleTimeService = middleTimeService;
    }

    serveFood(student: Student): void {
        //Gera um fator de variação na distribuição normal (0 e 1)
        const variationFactor = this.randomGenerator.next();

        //Ajusta o tempo de serviço com base no tempo médioe variação 
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        const serviceTime = this.middleTimeService * scaledFactor;

        this.currentStudent = student; // Define o estudante atual
        console.log(`Funcionário ${this.coWorkerName} servirá a comida para ${student.getRegister()} em aproximadamente ${serviceTime.toFixed(2)} segundos.`);
    }

    getCurrentStudent(): Student | null {
        return this.currentStudent;
    }

    
}