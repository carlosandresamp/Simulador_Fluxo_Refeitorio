import { Student } from "./student";
import { ExternalQueue } from "./externalQueue";
import { InternalQueue } from "./internalQueue";
import { Service } from "./service";
import { Turnstile } from "./turnstile";
import { Hall } from "./hall";
import { Observer } from "../simulator/observer";

export class Cafeteria {
    private filaExterna: ExternalQueue;
    private filaInterna: InternalQueue;
    private atendimento: Service;
    private catraca: Turnstile;
    private salao: Hall;

    constructor(capacidadeFilaInterna: number, observer: Observer) {
        this.filaExterna = new ExternalQueue();
        this.filaInterna = new InternalQueue(capacidadeFilaInterna);
        this.atendimento = new Service();
        this.catraca = new Turnstile();
        this.salao = new Hall(20, observer);
    }

    chegadaDeAluno(): void {
        // Implementar lógica de chegada
    }

    entradaAlunoCatraca(): void {
        // Implementar lógica da catraca
    }

    entradaAlunoFilaInterna(): void {
        // Implementar lógica da fila interna
    }

    atendimentoAluno(): void {
        // Implementar lógica de atendimento
    }

    ocupacaoMesa(estudante: Student): void {
        // Implementar lógica de ocupação
    }

    saidaRefeitorio(): void {
        // Implementar lógica de saída
    }

    // Getters
    getExternalQueue(): ExternalQueue {
        return this.filaExterna;
    }

    getInternalQueue(): InternalQueue {
        return this.filaInterna;
    }

    getService(): Service {
        return this.atendimento;
    }

    getTurnstile(): Turnstile {
        return this.catraca;
    }

    getHall(): Hall {
        return this.salao;
    }

    // Métodos de negócio
    public addStudentToExternalQueue(student: Student): void {
        this.filaExterna.addStudent(student);
    }

    public moveStudentToTurnstile(): boolean {
        if (this.filaExterna.emptyExternalQueue()) {
            return false;
        }

        const student = this.filaExterna.removeStudent();
        return this.catraca.typeRegister(student);
    }

    public moveStudentToInternalQueue(): boolean {
        if (!this.catraca.getStudent()) {
            return false;
        }

        const student = this.catraca.removeStudent();
        this.filaInterna.addStudent(student);
        return true;
    }

    public serveStudent(student: Student): void {
        this.atendimento.serveFood(student);
    }

    public finishMeal(student: Student, timestamp: number): void {
        this.salao.removerAluno(student, timestamp);
        student.setStatus("LEAVING");
    }
}