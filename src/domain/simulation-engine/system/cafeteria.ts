import { Student } from "./student";
import { Hall } from "./hall";
import { Turnstile } from "./turnstile";
import { ExternalQueue } from "./externalQueue";
import { Service } from "./service";
import { InternalQueue } from "./internalQueue";

export class Cafeteria {
    private _hall: Hall;
    private _service: Service;
    private _turnstile: Turnstile;
    private _externalQueue: ExternalQueue;
    private _internalQueue: InternalQueue;

    constructor(
        hall: Hall,
        service: Service,
        turnstile: Turnstile,
        externalQueue: ExternalQueue,
        internalQueue: InternalQueue
    ) {
        this._hall = hall;
        this._service = service;
        this._turnstile = turnstile;
        this._externalQueue = externalQueue;
        this._internalQueue = internalQueue;
    }

    // Getter e Setter para hall
    public getHall(): Hall {
        return this._hall;
    }
    public setHall(hall: Hall) {
        this._hall = hall;
    }

    // Getter e Setter para service
    public getService(): Service {
        return this._service;
    }
    public setService(service: Service) {
        this._service = service;
    }

    // Getter e Setter para turnstile
    public getTurnstile(): Turnstile {
        return this._turnstile;
    }
    public setTurnstile(turnstile: Turnstile) {
        this._turnstile = turnstile;
    }

    // Getter e Setter para externalQueue
    public getExternalQueue(): ExternalQueue {
        return this._externalQueue;
    }
    public setExternalQueue(externalQueue: ExternalQueue) {
        this._externalQueue = externalQueue;
    }

    // Getter e Setter para internalQueue
    public getInternalQueue(): InternalQueue {
        return this._internalQueue;
    }
    public setInternalQueue(internalQueue: InternalQueue) {
        this._internalQueue = internalQueue;
    }

    // Chegada do aluno ao refeitório
    public studentArrival(student: Student): void {
        console.log("Um aluno chegou ao refeitório.");
        this._externalQueue.addStudent(student);
    }

    // Entrada do aluno na catraca
    public enterTurnstile(): number {
        console.log("O aluno está tentando passar pela catraca...");
        const student = this._externalQueue.removeStudent();
    
        const registerTime = this._turnstile.calculateRegisterTime();
        console.log("Tempo estimado de digitação no Refeitório: " + registerTime.toFixed(2) + " segundos.");
    
        // Agora, após calcular o tempo, efetua o registro do aluno
        this._turnstile.typeRegister(student);
        return registerTime;
    }

    // Entrada do aluno na fila interna
    public enterInternalQueue(): void {
        console.log("O aluno entrou na fila interna.");
        const student = this._turnstile.getStudent(); // Modifiquei chamando o método getStudent, pois o atributo estudante da classe catraca é privado
        this._turnstile.removeStudent();
        this._internalQueue.addStudent(student);
    }

    // Atendimento do aluno com o aluno como parâmetro
    public serveStudent(student: Student): void {
        console.log(`Servindo comida para o aluno ${student.getRegister()}...`);
        // Removendo o aluno da fila interna se necessário.
        this._internalQueue.removeStudent();
        this._service.serveFood();
    }

    // Ocupar uma mesa
    public occupyTable(student: Student): void {
        console.log("O aluno ocupou uma mesa.");
        this._hall.addStudent(student);
    }

    // Finalizar refeição e liberar mesa
    public finishMeal(student: Student): void {
        console.log("O aluno terminou a refeição. Liberando a mesa.");
        this._hall.removeStudent(student);
    }
}
