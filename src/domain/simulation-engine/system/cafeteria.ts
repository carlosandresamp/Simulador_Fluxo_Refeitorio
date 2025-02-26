import { Student } from "./student";
import { ExternalQueue } from "./externalQueue";
import { InternalQueue } from "./internalQueue";
import { Service } from "./service";
import { Turnstile } from "./turnstile";
import { Hall } from "./hall";
import { Observer } from "../simulator/observer";

export class Cafeteria {
    private externalQueue: ExternalQueue;
    private internalQueue: InternalQueue;
    private service: Service;
    private turnstile: Turnstile;
    private hall: Hall;
    private observer: Observer;

    constructor(internalQueueLimit: number, observer: Observer) {
        this.externalQueue = new ExternalQueue();
        this.internalQueue = new InternalQueue(internalQueueLimit);
        this.service = new Service();
        this.turnstile = new Turnstile();
        this.hall = new Hall(20, observer);
        this.observer = observer;
    }
    // Getters
    getExternalQueue(): ExternalQueue {
        return this.externalQueue;
    }

    getInternalQueue(): InternalQueue {
        return this.internalQueue;
    }

    getService(): Service {
        return this.service;
    }

    getTurnstile(): Turnstile {
        return this.turnstile;
    }

    getHall(): Hall {
        return this.hall;
    }

    // Métodos de negócio
    public addStudentToExternalQueue(student: Student): void {
        this.externalQueue.addStudent(student);
    }

    public moveStudentToTurnstile(): boolean {
        if (this.turnstile.getStudent() !== null) {
            return false;
        }

        if (!this.externalQueue.isEmpty()) {
            const student = this.externalQueue.removeStudent();
            if (student) {
                return this.turnstile.registerStudent(student);
            }
        }
        return false;
    }

    public moveStudentToInternalQueue(): boolean {
        const student = this.turnstile.getStudent();
        if (!student) return false;

        if (this.internalQueue.addStudent(student)) {
            this.turnstile.removeStudent();
            return true;
        }
        return false;
    }

    public serveStudent(student: Student): void {
        this.service.serveFood(student);
    }

    public finishMeal(student: Student, timestamp: number): void {
        this.hall.removeStudent(student, timestamp);
        student.setStatus("LEAVING");
    }
}