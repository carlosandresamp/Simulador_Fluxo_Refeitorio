import { Service } from "../domain/simulation-engine/system/service";

describe("Service", () => {
    let service: Service;

    beforeEach(() => {
        service = new Service("001", "Carlos André", 10);
    });

    test("Deve inicializar com os valores corretos", () => {
        expect(service.coWorkerRegister).toBe("001");
        expect(service.coWorkerName).toBe("Carlos André");
        expect(service.middleTimeService).toBe(10);
    });

    test("Deve exibir uma mensagem ao servir comida", () => {
        console.log = jest.fn(); // Espionando o console.log

        service.toServeFood();

        expect(console.log).toHaveBeenCalledWith("Funcionário Carlos André está servindo a comida.");
    });
});
