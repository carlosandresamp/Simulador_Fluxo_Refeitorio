import { Turnstile } from "../domain/simulation-engine/system/turnstile";
import { Student } from "../domain/simulation-engine/system/student";

describe("Turnstile", () => {
    let turnstile: Turnstile;
    let studentMock: Student;

    beforeEach(() => {
        turnstile = new Turnstile();
        
        // Criando um mock para a classe Student
        studentMock = {
            getregister: jest.fn().mockReturnValue("12345")
        } as unknown as Student;
    });

    test("Deve iniciar com a turnstile bloqueada e sem aluno", () => {
        expect(turnstile.accessable).toBe(false);
        expect(turnstile.student).toBeNull();
    });

    test("Deve registrar a matrícula do aluno e liberar a passagem", () => {
        turnstile.toTypeRegister(studentMock);

        expect(turnstile.student).toBe(studentMock);
        expect(turnstile.accessable).toBe(true);
        expect(studentMock.getregister).toHaveBeenCalled(); // Verifica se o método foi chamado
    });

    test("Deve remover o aluno da turnstile e bloquear a passagem", () => {
        turnstile.toTypeRegister(studentMock);
        turnstile.toRemoveStudent();

        expect(turnstile.student).toBeNull();
        expect(turnstile.accessable).toBe(false);
    });

    test("Deve calcular um tempo de digitação entre 0 e 5 segundos", () => {
        const time = turnstile.toCalculateRegisterTime();
        expect(time).toBeGreaterThanOrEqual(0);
        expect(time).toBeLessThanOrEqual(5);
    });
});
