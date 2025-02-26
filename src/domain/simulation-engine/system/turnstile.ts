import { Student } from "./student";

export class Turnstile {
    protected accessible: boolean;
    private student: Student | null;
    private isBlocked: boolean;

    constructor() {
        this.accessible = false;
        this.student = null;
        this.isBlocked = false;
    }

    getAccessible(): boolean {
        return this.accessible;
    }

    setAccessible(value: boolean): void {
        this.accessible = value;
    }

    getStudent(): Student | null {
        return this.student;
    }

    setStudent(student: Student | null): void {
        this.student = student;
    }

    calculateRegisterTime(): number {
        const registeringTime = this.student?.simulateTypingTime() || 0;
        return Math.random() * registeringTime;
    }

    registerStudent(student: Student): boolean {
        if (this.isBlocked) {
            console.log("Catraca está bloqueada. Não é possível registrar o aluno.");
            return false;
        }

        if (this.getStudent() !== null) {
            console.log("Já existe um aluno registrado na catraca.");
            return false;
        }

        this.student = student;
        this.accessible = true;
        console.log(`Matrícula ${student.getRegistration()} registrada.`);
        return true;
    }

    removeStudent(): Student {
        const student = this.getStudent();
        if (!student) {
            throw new Error("Não é possível remover um aluno. Nenhum aluno está registrado.");
        }

        console.log(`Aluno ${student.getRegistration()} removido da catraca.`);
        this.setStudent(null);
        this.setAccessible(false);
        return student;
    }

    isTurnstileAccessible(): boolean {
        const isAccessible = this.getAccessible() && !this.isBlocked;
        if (isAccessible) {
            console.log("Catraca Disponível para uso.");
        } else {
            console.log("Catraca Indisponível.");
        }
        return isAccessible;
    }

    blockTurnstile(): void {
        this.isBlocked = true;
        console.log("Catraca bloqueada.");
    }

    unblockTurnstile(): void {
        this.isBlocked = false;
        console.log("Catraca desbloqueada.");
    }

    isTurnstileBlocked(): boolean {
        return this.isBlocked;
    }
}
