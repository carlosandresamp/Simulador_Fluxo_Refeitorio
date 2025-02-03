import {Aluno} from "./aluno";

export class Salao{
    public capacidadeAluno: Aluno[] = [];
    public capacidadeOcupada: number = 0;
    private tempoOcupacao: number;
    public capacidadeMaxSalao: number;

    constructor(capacidadeMaxSalao: number, tempoOcupacao: number){
        this.capacidadeMaxSalao = capacidadeMaxSalao;
        this.tempoOcupacao = tempoOcupacao;
    }
    getTempoOcupacao():number{
        return this.tempoOcupacao;
    }
    setTempoOcupacao(tempo:number):void{
        this.tempoOcupacao = tempo;
    }

    adicionarAluno(aluno: Aluno): boolean{
        if(this.capacidadeOcupada < this.capacidadeMaxSalao){
            this.capacidadeOcupada++;
            this.capacidadeAluno.push(aluno);
            setTimeout(() => this.removerAluno(aluno), this.tempoOcupacao);
            return true;
        }
        return false;
    }
    removerAluno(aluno: Aluno): void{
        const index = this.capacidadeAluno.indexOf(aluno);
        if(index !== -1){
            this.capacidadeAluno.splice(index, 1);
            this.capacidadeOcupada--;
        }
    }
}