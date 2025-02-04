import { Student } from "./student";// Importa a classe Aluno

// Classe que representa uma catraca eletrônica
export class Turnstile {
    accessable: boolean; // Indica se a passagem está liberada
    student: Student | null; // Armazena o aluno que está passando pela catraca

    constructor() {
        this.accessable = false; // Inicialmente a catraca está bloqueada
        this.student = null; // Nenhum aluno está passando
    }

    // Simula o tempo de digitação da matrícula de um aluno
    toCalculateRegisterTime(): number {
        return Math.random() * 5; // Retorna um tempo aleatório entre 0 e 5 segundos
    }

    // Registra a matrícula do aluno na catraca e libera a passagem
    toTypeRegister(student:Student): void {
        this.student=student; // Associa o aluno à catraca
        console.log(`Matrícula ${student.getregister()} registrada.`); // Exibe a matrícula registrada
        this.accessable = true; // Libera a passagem
    }

    // Remove o aluno da catraca após a passagem
    toRemoveStudent(): void {
        console.log(`Aluno ${this.student?.getregister()} removido da catraca.`); // Exibe mensagem de remoção
        this.student = null; // Remove a referência ao aluno
        this.accessable = false; // Bloqueia novamente a passagem
    }
}