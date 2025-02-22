import { Student } from "./student";

export class Hall{
    private capacityByStudent: Student[] = [];
    private occupiedCapacity: number = 0;
    private occupationTime: number;
    private maxHallCapacity: number;

    constructor(){}

    getMaxHallCapacity(): number {
        return this.maxHallCapacity;
    }

    setMaxHallCapacity(maxHallCapacity:number){
        return this.maxHallCapacity = maxHallCapacity;
    }

    getOccupiedCapacity(): number {
        return this.occupiedCapacity;
    }

    setOccupiedCapacity(occupiedCapacity:number){
        return this.occupiedCapacity = occupiedCapacity;
    }

    getCapacityByStudents():Array<Student> {
        return this.capacityByStudent;
    }

    setCapacityByStudent(capacityByStudent:Array<Student>){
        return this.capacityByStudent = capacityByStudent;
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