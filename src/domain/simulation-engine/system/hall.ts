import { Student } from "./student";

export class Hall{
    public capacityByStudent: Student[] = [];
    public occupiedCapacity: number = 0;
    private occupationTime: number;
    public maxHallCapacity: number;

    constructor(maxHallCapacity: number, occupationTime: number){
        this.maxHallCapacity = maxHallCapacity;
        this.occupationTime=occupationTime;
    }
    getOccupationTime():number{
        return this.occupationTime;
    }
    setOccupationTime(timing:number):void{
        this.occupationTime=timing;
    }

    adicionarAluno(student:Student): boolean{
        if(this.occupiedCapacity < this.maxHallCapacity){
            this.occupiedCapacity++;
            this.capacityByStudent.push(student);
            setTimeout(() => this.toRemoveStudent(student), this.occupationTime);
            return true;
        }
        return false;
    }
    toRemoveStudent(student:Student): void{
        const index = this.capacityByStudent.indexOf(student);
        if(index !== -1){
            this.capacityByStudent.splice(index, 1);
            this.occupiedCapacity--;
        }
    }
}