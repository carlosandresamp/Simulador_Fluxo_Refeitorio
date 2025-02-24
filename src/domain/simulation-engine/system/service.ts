import { Student } from './student';

export class Service {
    private coWorkerRegister: string;
    private coWorkerName: string;
    private middleTimeService: number;
    private currentStudent: Student | null = null;

    constructor(coWorkerRegister: string, coWorkerName: string, middleTimeService: number) {
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
    }

    serveFood(student: Student): void {
        if (!this.coWorkerName) {
            throw new Error("Não é possível servir comida. O nome do funcionário não está definido.");
        }
        this.currentStudent = student; // Define o estudante atual
        console.log(`Funcionário ${this.coWorkerName} está servindo a comida para ${student.getRegister()}.`);
    }

    getCurrentStudent(): Student | null {
        return this.currentStudent;
    }
}