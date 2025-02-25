import { Student } from "./student";

export class Turnstile {
    protected accessable: boolean;
    private student: Student | null;
    private isBlocked: boolean; // Propriedade para verificar se a catraca está bloqueada

    constructor() {
        this.accessable = false;
        this.student = null;
        this.isBlocked = false; // Inicialmente, a catraca não está bloqueada
    }

    getAccessable(): boolean {
        return this.accessable;
    }

    setAccessable(value: boolean): void {
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
            console.log("Já existe um aluno registrado na catraca.");
            return false;
        }

        this.student = student;
        this.accessable = true;
        console.log(`Matrícula ${student.getMatricula()} registrada.`);
        return true;
    }

    removeStudent(): Student {
        const student = this.getStudent();
        if (!student) {
            throw new Error("Não é possível remover um aluno. Nenhum aluno está registrado.");
        }

        console.log(`Aluno ${student.getMatricula()} removido da catraca.`);
        this.setStudent(null);
        this.setAccessable(false);
        return student;
    }

    isTurnstileAccessable(): boolean {
        const isAccessible = this.getAccessable() && !this.isBlocked;
        if (isAccessible) {
            console.log("Catraca Disponível para uso.");
        } else {
            console.log("Catraca Indisponível.");
        }
        return isAccessible;
    }

    // Método para bloquear a catraca
    blockTurnstile(): void {
        this.isBlocked = true;
        console.log("Catraca bloqueada.");
    }

    // Método para desbloquear a catraca
    unblockTurnstile(): void {
        this.isBlocked = false;
        console.log("Catraca desbloqueada.");
    }

    // Método para verificar se a catraca está bloqueada
    isTurnstileBlocked(): boolean {
        return this.isBlocked;
    }
}

export class Catraca {
    private liberado: boolean;
    private estudante: Student | null;

    constructor() {
        this.liberado = false;
        this.estudante = null;
    }

    digitarMatricula(estudante: Student): boolean {
        if (this.estudante !== null) {
            return false;
        }
        this.estudante = estudante;
        this.liberado = true;
        return true;
    }

    removerAluno(): Student | null {
        const estudante = this.estudante;
        this.estudante = null;
        this.liberado = false;
        return estudante;
    }

    estaLiberada(): boolean {
        return this.liberado;
    }
}