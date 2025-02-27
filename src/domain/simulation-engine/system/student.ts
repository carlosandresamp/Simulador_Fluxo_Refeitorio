import { GaussianRandom } from "../util/random-generators";

export type StudentStatus = 
    | "WAITING" 
    | "REGISTERING" 
    | "IN_QUEUE" 
    | "BEING_SERVED" 
    | "EATING" 
    | "LEAVING";

export class Student {
    private registration: string;
    private arrivalTime: Date;
    private serviceTime: Date;
    private status: StudentStatus;
    private registrationTime: number;
    private randomGenerator: GaussianRandom;
    private middleTypingTime: number;

    constructor(registration: string, registrationTime: number, middleTypingTime: number) {
        this.registration = registration;
        this.arrivalTime = new Date();
        this.serviceTime = new Date();
        this.status = "WAITING";
        this.registrationTime = registrationTime;
        this.middleTypingTime = middleTypingTime;
        this.randomGenerator = new GaussianRandom();
    }

    getRegistration(): string {
        return this.registration;
    }

    setRegistration(newRegistration: string): void {
        this.registration = newRegistration;
    }

    getStatus(): StudentStatus {
        return this.status;
    }

    setStatus(newStatus: StudentStatus): void {
        this.status = newStatus;
    }

    getRegistrationTime(): number {
        return this.registrationTime;
    }

    getArrivalTime(): Date {
        return this.arrivalTime;
    }

    getServiceTime(): Date {
        return this.serviceTime;
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

    exteernalQueueWaitingTime(): number {
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