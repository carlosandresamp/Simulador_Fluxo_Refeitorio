import { Aluno } from "./Aluno"; // Importa a classe Aluno

// Classe que representa uma catraca eletrônica
export class Catraca {
    liberado: boolean; // Indica se a passagem está liberada
    aluno: Aluno | null; // Armazena o aluno que está passando pela catraca

    constructor() {
        this.liberado = false; // Inicialmente a catraca está bloqueada
        this.aluno = null; // Nenhum aluno está passando
    }

    // Simula o tempo de digitação da matrícula de um aluno
    calcularTempoDigMatricula(): number {
        return Math.random() * 5; // Retorna um tempo aleatório entre 0 e 5 segundos
    }

    // Registra a matrícula do aluno na catraca e libera a passagem
    digitarMatricula(aluno: Aluno): void {
        this.aluno = aluno; // Associa o aluno à catraca
        console.log(`Matrícula ${aluno.matricula} registrada.`); // Exibe a matrícula registrada
        this.liberado = true; // Libera a passagem
    }

    // Remove o aluno da catraca após a passagem
    removerAluno(): void {
        console.log(`Aluno ${this.aluno?.matricula} removido da catraca.`); // Exibe mensagem de remoção
        this.aluno = null; // Remove a referência ao aluno
        this.liberado = false; // Bloqueia novamente a passagem
    }
}
