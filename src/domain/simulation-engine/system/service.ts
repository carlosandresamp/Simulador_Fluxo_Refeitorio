// Classe que representa o atendimento de um funcionário
export class Service {
    coWorkerRegister: string; // Identificador único do funcionário
    coWorkerName: string; // Nome do funcionário responsável pelo atendimento
    middleTimeService: number; // Tempo médio necessário para servir a comida

    /**
     * Construtor da classe Atendimento
     * @param coWorkerRegister - Identificação do funcionário
     * @param coWorkerName - Nome do funcionário
     * @param middleTimeService - Tempo médio de serviço em minutos
     */
    constructor(coWorkerRegister: string, coWorkerName: string, middleTimeService: number) {
        this.coWorkerRegister=coWorkerRegister; // Atribui o ID do funcionário
        this.coWorkerName=coWorkerName; // Atribui o nome do funcionário
        this.middleTimeService=middleTimeService; // Atribui o tempo médio de serviço
    }

    /**
     * Simula o ato de servir comida por um funcionário
     */
    toServeFood(): void {
        console.log(`Funcionário ${this.coWorkerName} está servindo a comida.`); // Exibe mensagem informando que o funcionário está servindo
    }
}
