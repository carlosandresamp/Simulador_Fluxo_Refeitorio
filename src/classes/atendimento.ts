// Classe que representa o atendimento de um funcionário
export class Atendimento {
    idFuncionario: string; // Identificador único do funcionário
    nomeFuncionario: string; // Nome do funcionário responsável pelo atendimento
    tempoMedioServir: number; // Tempo médio necessário para servir a comida

    /**
     * Construtor da classe Atendimento
     * @param idFuncionario - Identificação do funcionário
     * @param nomeFuncionario - Nome do funcionário
     * @param tempoMedioServir - Tempo médio de serviço em minutos
     */
    constructor(idFuncionario: string, nomeFuncionario: string, tempoMedioServir: number) {
        this.idFuncionario = idFuncionario; // Atribui o ID do funcionário
        this.nomeFuncionario = nomeFuncionario; // Atribui o nome do funcionário
        this.tempoMedioServir = tempoMedioServir; // Atribui o tempo médio de serviço
    }

    /**
     * Simula o ato de servir comida por um funcionário
     */
    servirComida(): void {
        console.log(`Funcionário ${this.nomeFuncionario} está servindo a comida.`); // Exibe mensagem informando que o funcionário está servindo
    }
}
