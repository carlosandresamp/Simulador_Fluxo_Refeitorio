import { Student } from "./student";

export class Turnstile {
    protected accessable: boolean;
    private student: Student | null;
    private isBlocked: boolean;

    constructor() {
        this.accessable = false;
        this.student = null;
        this.isBlocked = false;
    }

    getAccessable(): boolean {
        return this.accessable;
    }

    setAccessable(value: boolean) {
        this.accessable = value;
    }

    getStudent(): Student | null {
        return this.student;
    }

    setStudent(student: Student | null): void {
        this.student = student;
    }

    calculateRegisterTime(): number {
        const drawerRegisteringTimeStudent = this.student?.simulateTypingTime() || 0;
        return Math.random() * drawerRegisteringTimeStudent;
    }

    typeRegister(student: Student): boolean {
        if (this.isBlocked) {
            console.log("Catraca está bloqueada. Não é possível registrar o aluno.");
            return false;
        }

        if (this.getStudent() !== null) {
            console.log("Sem alunos registrados na catraca.");
            return false;
        }

        this.student = student;
        this.accessable = true;
        console.log(`Matrícula ${student.getRegister()} registrada.`);
        return true;
    }

    removeStudent(): Student {
        const student = this.getStudent();
        if (!student) {
            throw new Error("Não é possível remover um aluno. Nenhum aluno está registrado.");
        }

        console.log(`Aluno ${this.getStudent()?.getRegister()} removido da catraca.`);
        this.setStudent(null);
        this.setAccessable(false);
        return student;
    }

    isTurnstileAccessable(): boolean {
        if (this.getAccessable()) {
            console.log("Catraca Disponível para uso.");
            return true;
        }
        return false;
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
