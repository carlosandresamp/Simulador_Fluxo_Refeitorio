import { Student } from "./student";

export class Turnstile {
    protected accessable: boolean;
    private student: Student | null;

    constructor() {
        this.accessable = false;
        this.student = null;
    }

    getAccessable(): boolean {
        return this.accessable;
    }

    setAccessable(value: boolean) {
        return this.accessable = value;
    }

    getStudent(): Student | null {
        return this.student;
    }

    setStudent(student: Student | null): void {
        this.student = student;
    }

    calculateRegisterTime(): number {
        return Math.random() * 5;
    }

    typeRegister(student: Student): void {
        this.setStudent(student);
        console.log(`Matrícula ${student.getRegister()} registrada.`);
        this.setAccessable(true);
    }

    removeStudent(): void {
        console.log(`Aluno ${this.getStudent()?.getRegister()} removido da catraca.`);
        this.setStudent(null);
        this.setAccessable(false);
    }

    isTurnstileAccessable():boolean{
        if(this.getAccessable()){
            console.log("Catraca Disponível para uso.");
            return true;
        }
        return false;
    }
}