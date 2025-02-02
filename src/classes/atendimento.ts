export class Atendimento {
    idFuncionario: string;
    nomeFuncionario: string;
    tempoMedioServir: number;

    constructor(idFuncionario: string, nomeFuncionario: string, tempoMedioServir: number) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
        this.tempoMedioServir = tempoMedioServir;
    }

    servirComida(): void {
        console.log(`Funcionário ${this.nomeFuncionario} está servindo a comida.`);
    }
}
