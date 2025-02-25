import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";


export class Hall{
    private capacityByStudent: Student[] = [];
    private occupiedCapacity: number = 0;
    private occupationTime: number;
    private maxHallCapacity: number;
    private middleOccupationTime:number;
    private randomGenerator: GaussianRandom

    constructor(){
        if (this.maxHallCapacity <= 0) {
            throw new Error("A capacidade máxima do salão deve ser maior que zero.");
        }
        if (this.middleOccupationTime <= 0) {
            throw new Error("O tempo médio de permanência deve ser maior que zero.");
        }

        this.randomGenerator = new GaussianRandom()
    }

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

    hasAvailableTables(): boolean {
        return this.occupiedCapacity < this.maxHallCapacity;
    }

    seatStudent(student: Student): boolean {
        if (this.hasAvailableTables()) {
            return this.addStudent(student);
        }
        return false;
    }

    calculateOccupationTime(): number {
        const variationFactor = this.randomGenerator.next(); // Valor entre 0 e 1
        const minFactor = 0.8; // Redução máxima de 20%
        const maxFactor = 1.2; // Aumento máximo de 20%
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);

        const occupationTime = this.middleOccupationTime * scaledFactor;
        console.log(`Tempo estimado de permanência: ${occupationTime.toFixed(2)} segundos.`);
        return occupationTime;      
    }
}