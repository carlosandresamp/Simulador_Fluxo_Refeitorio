import { Student } from "./student";
import { Hall } from "./hall";
import { Turnstile } from "./turnstile";
import { ExternalQueue } from "./externalQueue";
import { Service } from "./service";
import { InternalQueue } from "./internalQueue";

export class Cafeteria {
    private student: Student;
    private hall: Hall;
    private service: Service;
    private turnstile: Turnstile;
    private externalQueue: ExternalQueue;
    private internalQueue: InternalQueue;

    constructor(student: Student, hall: Hall, service: Service, turnstile: Turnstile, externalQueue: ExternalQueue, internalQueue: InternalQueue) {
        this.student = student;
        this.hall = hall;
        this.service = service;
        this.turnstile = turnstile;
        this.externalQueue = externalQueue;
        this.internalQueue = internalQueue;
    }

    // Chegada do aluno ao refeitório 
    studentArrival(): void {
        console.log("Um aluno chegou ao refeitório.");
        //this.externalQueue.addStudent(this.student);
    }

    // Entrada do aluno na catraca 
    enterTurnstile(): void {
        console.log("O aluno está tentando passar pela catraca...");
        this.turnstile.typeRegister(this.student); 
    }
    
    // Entrada do aluno na fila interna 
    enterInternalQueue(student: Student): void {
        console.log("O aluno entrou na fila interna.");
        this.internalQueue.addStudent(student);
    }

    // Atendimento do aluno 
    serveStudent(): void {
        console.log("Servindo comida para o aluno...");
        this.service.serveFood();
        
    }

    // Ocupar uma mesa 
    occupyTable(student: Student): void {
        console.log("O aluno ocupou uma mesa.");
        this.hall.addStudent(student);
    }

    // Finalizar refeição e liberar mesa 
    finishMeal(student: Student): void {
        console.log("O aluno terminou a refeição. Liberando a mesa.");
        this.hall.removeStudent(student);
    }
}
