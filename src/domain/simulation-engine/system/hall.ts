import { Student } from "./student";

export class Hall{
    private readonly capacityByStudent: Student[] = [];
    private occupiedCapacity: number = 0;
    private occupationTime: number;
    private readonly maxHallCapacity: number;

    constructor(maxHallCapacity: number, occupationTime: number){
        this.maxHallCapacity = maxHallCapacity;
        this.occupationTime=occupationTime;
    }

    getMaxHallCapacity(): number {
        return this.maxHallCapacity;
    }

    getOccupiedCapacity(): number {
        return this.occupiedCapacity;
    }

    getCapacityByStudents(): ReadonlyArray<Student> {
        return this.capacityByStudent;
    }

    getOccupationTime():number{
        return this.occupationTime;
    }
    setOccupationTime(timing:number):void{
        if(timing <= 0) throw new Error("O tempo de ocupação deve ser maior que zero");
        this.occupationTime = timing;
    }

    addStudent(student:Student): boolean{
        if(this.occupiedCapacity < this.maxHallCapacity){
            this.occupiedCapacity++;
            this.capacityByStudent.push(student);
            setTimeout(() => this.removeStudent(student), this.occupationTime);
            return true;
        }
        return false;
    }
    removeStudent(student:Student): void{
        const index = this.capacityByStudent.indexOf(student);
        if(index !== -1){
            this.capacityByStudent.splice(index, 1);
            this.occupiedCapacity--;
        }
    }
}