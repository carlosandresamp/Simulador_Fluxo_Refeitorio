import { Aluno } from "./Aluno";

export class Catraca {
    liberado: boolean;
    aluno: Aluno | null;

    constructor() {
        this.liberado = false;
        this.aluno = null;
    }

    calcularTempoDigMatricula(): number {
        return Math.random() * 5; // Simula tempo de digitação
    }

    digitarMatricula(aluno: Aluno): void {
        this.aluno = aluno;
        console.log(`Matrícula ${aluno.matricula} registrada.`);
        this.liberado = true;
    }

    removerAluno(): void {
        console.log(`Aluno ${this.aluno?.matricula} removido da catraca.`);
        this.aluno = null;
        this.liberado = false;
    }
}
