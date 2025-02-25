import { GaussianRandom } from "../util/random-generators";

export type StudentStatus = "WAITING" | "IN_QUEUE" | "IN_SERVICE" | "SERVED" | "LEAVING";

export class Student {
    private matricula: string;
    private tempoChegada: Date;
    private tempoServico: Date | null;
    private status: StudentStatus;
    private randomGenerator: GaussianRandom;
    private middleTypingTime: number;

    constructor(matricula: string, middleTypingTime: number) {
        this.matricula = matricula;
        this.tempoChegada = new Date();
        this.tempoServico = null;
        this.status = "WAITING";
        this.middleTypingTime = middleTypingTime;
        this.randomGenerator = new GaussianRandom();
    }

    getMatricula(): string {
        return this.matricula;
    }

    setMatricula(novaMatricula: string): void {
        this.matricula = novaMatricula;
    }

    getStatus(): StudentStatus {
        return this.status;
    }

    setStatus(novoStatus: StudentStatus): void {
        this.status = novoStatus;
        if (novoStatus === "IN_SERVICE") {
            this.tempoServico = new Date();
        }
    }

    getTempoChegada(): Date {
        return this.tempoChegada;
    }

    getTempoServico(): Date | null {
        return this.tempoServico;
    }

    simulateTypingTime(): number {
        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        
        const typingTime = this.middleTypingTime * scaledFactor;
        console.log(`O estudante levará aproximadamente ${typingTime.toFixed(2)} segundos para digitar a matrícula.`);
        return typingTime;
    }

    public getMiddleTypingTime(): number {
        return this.middleTypingTime;
    }
} 