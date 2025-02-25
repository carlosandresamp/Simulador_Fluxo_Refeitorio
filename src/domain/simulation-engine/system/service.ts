import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';

export class Service {
    private coWorkerRegister: string;
    private coWorkerName: string;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null = null;
    private serviceQueue: Student[] = []; // Fila de estudantes aguardando atendimento
    public middleTimeService: number;
    private isServiceBlocked: boolean = false; // Propriedade para verificar se o serviço está bloqueado

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
        this.randomGenerator = new GaussianRandom();
    }

    // Método para adicionar um estudante à fila de atendimento
    addStudentToQueue(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível adicionar estudantes à fila.");
            return;
        }
        this.serviceQueue.push(student);
        console.log(`Estudante ${student.getRegister()} foi adicionado à fila de atendimento.`);
    }

    // Serve um estudante
    serveFood(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível atender estudantes.");
            return;
        }

        // Gera um fator de variação na distribuição normal (0 e 1)
        const variationFactor = this.randomGenerator.next();

        // Ajusta o tempo de serviço com base no tempo médio e variação 
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        const serviceTime = this.middleTimeService * scaledFactor;

        this.currentStudent = student; // Define o estudante atual
        console.log(`Funcionário ${this.coWorkerName} servirá a comida para ${student.getRegister()} em aproximadamente ${serviceTime.toFixed(2)} segundos.`);

        // Simula o tempo de serviço
        setTimeout(() => {
            console.log(`Funcionário ${this.coWorkerName} terminou de servir a comida para ${student.getRegister()}.`);
            student.setStatus("atendido"); // Atualiza o status do estudante
            this.currentStudent = null; // Reseta o estudante atual

            // Verifica se há mais estudantes na fila e serve o próximo, se houver
            if (!this.isServiceQueueEmpty()) {
                const nextStudent = this.getNextStudent();
                if (nextStudent) {
                    this.serveFood(nextStudent); // Serve o próximo estudante
                }
            }
        }, serviceTime * 1000); // Converte para milissegundos
    }

    // Retorna o estudante atual que está sendo atendido
    getCurrentStudent(): Student | null {
        return this.currentStudent;
    }

    // Chama o próximo estudante da fila (se houver)
    getNextStudent(): Student | null {
        if (this.serviceQueue.length > 0) {
            return this.serviceQueue.shift() || null; // Remove o primeiro estudante da fila e o retorna
        }
        return null; // Caso não haja estudantes na fila
    }

    // Verifica se a fila de atendimento tem estudantes
    isServiceQueueEmpty(): boolean {
        return this.serviceQueue.length === 0;
    }

    // Método para desbloquear o serviço
    unblockService(): void {
        this.isServiceBlocked = false;
        console.log("Serviço desbloqueado.");
    }

    // Método para verificar se o serviço está bloqueado
    isServiceCurrentlyBlocked(): boolean {
        return this.isServiceBlocked;
    }
}