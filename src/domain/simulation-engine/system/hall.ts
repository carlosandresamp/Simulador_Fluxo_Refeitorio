import { Student } from "./student";
import { Observer } from "../simulator/observer";

export class Hall {
    private students: Student[];
    private currentOccupancy: number;
    private occupancyTime: number;
    private maxCapacity: number;
    private observer: Observer;

    constructor(maxCapacity: number, observer: Observer) {
        this.students = [];
        this.currentOccupancy = 0;
        this.maxCapacity = maxCapacity;
        this.occupancyTime = 20; // tempo padrão em minutos
        this.observer = observer;
    }

    addStudent(student: Student, timestamp: number): boolean {
        if (this.currentOccupancy < this.maxCapacity) {
            this.students.push(student);
            this.currentOccupancy++;
            this.observer.noticeTableOccupancy(this.currentOccupancy, timestamp);
            student.setStatus("EATING");
            console.log(`Estudante ${student.getRegistration()} ocupou uma mesa.`);
            return true;
        }
        console.log("Não há mesas disponíveis no momento.");
        return false;
    }

    removeStudent(student: Student, timestamp: number): void {
        const index = this.students.indexOf(student);
        if (index !== -1) {
            this.students.splice(index, 1);
            this.currentOccupancy--;
            this.observer.noticeTableOccupancy(this.currentOccupancy, timestamp);
            console.log(`Estudante ${student.getRegistration()} deixou a mesa.`);
        }
    }

    setMaxHallCapacity(maxCapacity: number): void {
        if (maxCapacity <= 0) {
            throw new Error("Invalid value for maxTableOccupancy: must be a non-negative number");
        }
        this.maxCapacity = maxCapacity;
    }

    getCurrentOccupancy(): number {
        return this.currentOccupancy;
    }

    hasAvailableTables(): boolean {
        return this.currentOccupancy < this.maxCapacity;
    }

    getStudents(): Student[] {
        return [...this.students];
    }
}