import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";
import { Observer } from "../simulator/observer";

export class Hall {
    private capacidadeAluno: Student[];
    private capacidadeOcupacao: number;
    private tempoOcupacao: number;
    private capacidadeMaxSalao: number;
    private observer: Observer;

    constructor(capacidadeMaxima: number, observer: Observer) {
        this.capacidadeAluno = [];
        this.capacidadeOcupacao = 0;
        this.capacidadeMaxSalao = capacidadeMaxima;
        this.tempoOcupacao = 20; // tempo padrão em minutos
        this.observer = observer;
    }

    adicionarAluno(aluno: Student, timestamp: number): boolean {
        if (this.capacidadeOcupacao < this.capacidadeMaxSalao) {
            this.capacidadeAluno.push(aluno);
            this.capacidadeOcupacao++;
            this.observer.noticeTableOccupancy(this.capacidadeOcupacao, timestamp);
            aluno.setStatus("EATING");
            return true;
        }
        return false;
    }

    removerAluno(aluno: Student, timestamp: number): void {
        const index = this.capacidadeAluno.indexOf(aluno);
        if (index !== -1) {
            this.capacidadeAluno.splice(index, 1);
            this.capacidadeOcupacao--;
            this.observer.noticeTableOccupancy(this.capacidadeOcupacao, timestamp);
        }
    }

    setMaxHallCapacity(maxCapacity: number): void {
        if (maxCapacity <= 0) {
            throw new Error("Invalid value for maxTableOccupancy: must be a non-negative number");
        }
        this.capacidadeMaxSalao = maxCapacity;
    }

    getOccupiedCapacity(): number {
        return this.capacidadeOcupacao;
    }

    hasAvailableTables(): boolean {
        return this.capacidadeOcupacao < this.capacidadeMaxSalao;
    }

    getStudents(): Student[] {
        return [...this.capacidadeAluno]; // Retorna uma cópia do array
    }
}