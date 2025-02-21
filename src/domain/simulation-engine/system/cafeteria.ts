import { Student } from "./student";
import { Hall } from "./hall";
import { Turnstile } from "./turnstile";
import { ExternalQueue } from "./externalQueue";
import { Service } from "./service";
import { InternalQueue } from "./internalQueue";

export class Cafeteria {
    private hall: Hall;
    private service: Service;
    private turnstile: Turnstile;
    private externalQueue: ExternalQueue;
    private internalQueue: InternalQueue;

    constructor(
        hall: Hall,
        service: Service,
        turnstile: Turnstile,
        externalQueue: ExternalQueue,
        internalQueue: InternalQueue
    ) {
        this.hall = hall;
        this.service = service;
        this.turnstile = turnstile;
        this.externalQueue = externalQueue;
        this.internalQueue = internalQueue;
    }

    // Chegada do aluno ao refeitório
    public studentArrival(student: Student): void {
        console.log("Um aluno chegou ao refeitório.");
        this.externalQueue.addStudent(student);
    }

    // Entrada do aluno na catraca
    public enterTurnstile(): void {
        console.log("O aluno está tentando passar pela catraca...");
        const student = this.externalQueue.removeStudent();
        this.turnstile.typeRegister(student);
    }
   
    // Entrada do aluno na fila interna
    public enterInternalQueue(): void {
        console.log("O aluno entrou na fila interna.");
        const student = this.turnstile.student;
        this.turnstile.removeStudent();
        this.internalQueue.addStudent(student);
     
    }

    // Atendimento do aluno com o aluno como parâmetro
    public serveStudent(student: Student): void {
        console.log(`Servindo comida para o aluno ${student.getRegister()}...`);
        // Removendo o aluno da fila interna se necessário.
        this.internalQueue.removeStudent();
        this.service.serveFood();
    }

    // Ocupar uma mesa
    public occupyTable(student: Student): void {
        console.log("O aluno ocupou uma mesa.");
        this.hall.addStudent(student);
    }

    // Finalizar refeição e liberar mesa
    public finishMeal(student: Student): void {
        console.log("O aluno terminou a refeição. Liberando a mesa.");
        this.hall.removeStudent(student);
    }
}
