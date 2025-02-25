import { Simulation } from "../../../domain/data-management/Entities/simulation";
import { SimulationResults } from "../../../domain/data-management/Entities/simulation-results";
import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "../events/eventMachine";
import { Student } from "../system/student";
import { StudentArrivingToTheExternalQueue } from "../events/studentArrivingToTheExternalQueue";
import { ExponentialRandom, RandomGeneratorI } from "../util/random-generators";
import { Observer } from "./observer";

export class Simulator {
    private cafeteria: Cafeteria;
    private machine: EventMachine;
    private simulation: Simulation;
    private randomGenerator: RandomGeneratorI;
    private observer: Observer;

    constructor(simulation: Simulation) {
        this.simulation = simulation;
        this.observer = new Observer();
        this.cafeteria = new Cafeteria(
            simulation.parameters.internalQueueLimit,
            this.observer
        );
        this.machine = new EventMachine();
        this.randomGenerator = new ExponentialRandom(simulation.parameters.serviceInterval);
        this.configureStudentArriving();
    }

    private configureStudentArriving() {
        for(let i = 0; i < this.simulation.parameters.studentCount; i++) {
            const servingTime = Math.random() * 2 * this.simulation.parameters.servingTime;
            const student = new Student(`${i + 1}`, servingTime);
            const arrivingInstant = Math.random() * this.simulation.parameters.serviceInterval;
            
            const arrivingEvent = new StudentArrivingToTheExternalQueue(
                arrivingInstant, 
                this.cafeteria, 
                this.machine, 
                student,
                this.randomGenerator
            );
            
            this.machine.addEvent(arrivingEvent);
        }
    }

    public executeSimulation() {
        const startTime = Date.now();
        this.machine.processEvents();
        const endTime = Date.now();
        this.observer.setSimulationDuration(endTime - startTime);
    }

    public getResults(): SimulationResults {
        return this.observer.computeResults();
    }
} 