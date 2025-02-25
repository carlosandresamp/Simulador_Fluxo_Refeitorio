import { GaussianRandom } from "../util/random-generators";

export type StudentStatus = 
    | "WAITING" 
    | "REGISTERING" 
    | "IN_QUEUE" 
    | "BEING_SERVED" 
    | "EATING" 
    | "LEAVING";

export class Student {
    private matricula: string;
    private tempoChegada: Date;
    private tempoServico: Date;
    private status: StudentStatus;
    private registrationTime: number;
    private randomGenerator: GaussianRandom;
    private middleTypingTime: number;

    constructor(matricula: string, registrationTime: number, middleTypingTime: number) {
        this.matricula = matricula;
        this.tempoChegada = new Date();
        this.tempoServico = new Date();
        this.status = "WAITING";
        this.registrationTime = registrationTime;
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
    }

    getRegistrationTime(): number {
        return this.registrationTime;
    }

    getTempoChegada(): Date {
        return this.tempoChegada;
    }

    getTempoServico(): Date {
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