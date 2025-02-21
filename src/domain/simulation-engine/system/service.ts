//C.Andr
// Classe que representa o atendimento de um funcionário
export class Service{
    private coWorkerRegister: string; // Identificador único do funcionário
    private coWorkerName: string; // Nome do funcionário responsável pelo atendimento
    private middleTimeService: number; // Tempo médio necessário para servir a comida

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
    serveFood(): void {
        console.log(`Funcionário ${this.coWorkerName} está servindo a comida.`); // Exibe mensagem informando que o funcionário está servindo
    }
}
