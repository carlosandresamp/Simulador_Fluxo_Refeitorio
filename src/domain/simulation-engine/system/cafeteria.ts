import { Student } from "./student";
import { ExternalQueue } from "./externalQueue";
import { InternalQueue } from "./internalQueue";
import { Service } from "./service";
import { Turnstile } from "./turnstile";
import { Hall } from "./hall";
import { Observer } from "../simulator/observer";

export class Cafeteria {
    private _externalQueue: ExternalQueue;
    private _internalQueue: InternalQueue;
    private _service: Service;
    private _turnstile: Turnstile;
    private _hall: Hall;

    constructor(
        private internalQueueLimit: number,
        private observer: Observer
    ) {
        this._externalQueue = new ExternalQueue();
        this._internalQueue = new InternalQueue(internalQueueLimit);
        this._service = new Service();
        this._turnstile = new Turnstile();
        this._hall = new Hall(20, observer);
    }

    // Getters
    getExternalQueue(): ExternalQueue {
        return this._externalQueue;
    }

    getInternalQueue(): InternalQueue {
        return this._internalQueue;
    }

    getService(): Service {
        return this._service;
    }

    getTurnstile(): Turnstile {
        return this._turnstile;
    }

    getHall(): Hall {
        return this._hall;
    }

    // Métodos de negócio
    public addStudentToExternalQueue(student: Student): void {
        this._externalQueue.addStudent(student);
    }

    public moveStudentToTurnstile(): boolean {
        if (this._externalQueue.emptyExternalQueue()) {
            return false;
        }

        const student = this._externalQueue.removeStudent();
        return this._turnstile.typeRegister(student);
    }

    public moveStudentToInternalQueue(): boolean {
        if (!this._turnstile.getStudent()) {
            return false;
        }

        const student = this._turnstile.removeStudent();
        this._internalQueue.addStudent(student);
        return true;
    }

    public serveStudent(student: Student): void {
        this._service.serveFood(student);
    }

    public finishMeal(student: Student): void {
        this._hall.removeStudent(student);
        student.setStatus("LEAVING");
    }
}