export class Service {
    private coWorkerRegister: string;
    private coWorkerName: string;
    private middleTimeService: number;

    constructor(coWorkerRegister: string, coWorkerName: string, middleTimeService: number) {
        this.coWorkerRegister = coWorkerRegister;
        this.coWorkerName = coWorkerName;
        this.middleTimeService = middleTimeService;
    }

    serveFood(): void {
        console.log(`Funcionário ${this.coWorkerName} está servindo a comida.`);
    }
}