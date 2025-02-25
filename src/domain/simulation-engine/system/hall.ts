import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";
import { Observer } from "../simulator/observer";

export class Hall {
    private capacity: number;
    private occupiedSeats: number = 0;
    private occupationTime: number;
    private maxHallCapacity: number;
    private randomGenerator: GaussianRandom;
    private observer: Observer;

    constructor(capacity: number, observer: Observer) {
        this.capacity = capacity;
        this.maxHallCapacity = capacity;
        this.occupationTime = 0;
        this.randomGenerator = new GaussianRandom();
        this.observer = observer;
    }

    getMaxHallCapacity(): number {
        return this.maxHallCapacity;
    }

    setMaxHallCapacity(maxHallCapacity: number): void {
        if (maxHallCapacity <= 0) {
            throw new Error("A capacidade máxima do salão deve ser maior que zero");
        }
        this.maxHallCapacity = maxHallCapacity;
    }

    getOccupiedCapacity(): number {
        return this.occupiedSeats;
    }

    setOccupationTime(time: number): void {
        if (time <= 0) {
            throw new Error("O tempo de ocupação deve ser maior que zero");
        }
        this.occupationTime = time;
    }

    addStudent(student: Student): boolean {
        if (this.occupiedSeats < this.capacity) {
            this.occupiedSeats++;
            this.observer.noticeTableOccupancy(this.occupiedSeats);
            return true;
        }
        return false;
    }

    removeStudent(student: Student): void {
        if (this.occupiedSeats > 0) {
            this.occupiedSeats--;
            this.observer.noticeTableOccupancy(this.occupiedSeats);
        }
    }

    hasAvailableTables(): boolean {
        return this.occupiedSeats < this.maxHallCapacity;
    }

    calculateOccupationTime(): number {
        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        return this.occupationTime * scaledFactor;
    }
}