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
        const drawerRegisteringTimeStudent = this.student.simulateTypingTime();
        return Math.random() * drawerRegisteringTimeStudent;
    }

    typeRegister(student: Student):boolean {
        if (this.getStudent() !== null) {
            console.log("Sem alunos registrados na catraca.");
            return false;
        }
        
        this.student = student;
        this.accessable = true;
        console.log(`Matrícula ${student.getRegister()} registrada.`);
        return true;
    }

    removeStudent():Student{
        const student = this.getStudent();
        if (!student) {
            throw new Error("Não é possível remover um aluno. Nenhum aluno está registrado.");
        }
        
        console.log(`Aluno ${this.getStudent()?.getRegister()} removido da catraca.`);
        this.setStudent(null);
        this.setAccessable(false);
        return student
    }

    isTurnstileAccessable():boolean{
        if(this.getAccessable()){
            console.log("Catraca Disponível para uso.");
            return true;
        }
        return false;
    }
}