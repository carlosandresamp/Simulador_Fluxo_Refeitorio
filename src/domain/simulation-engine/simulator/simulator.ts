import { Simulation } from "../../../domain/data-management/Entities/simulation";
import { SimulationResults } from "../../../domain/data-management/Entities/simulation-results";
import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "../events/eventMachine";
import { Student } from "../system/student";
import { StudentArrivingToTheExternalQueue } from "../events/studentArrivingToTheExternalQueue";
import { GaussianRandom, RandomGeneratorI } from "../util/random-generators";
import { Observer } from "./observer";

export class Simulator {
    private cafeteria: Cafeteria;
    private machine: EventMachine;
    private simulation: Simulation;
    private randomGenerator: RandomGeneratorI;
    private observer: Observer;
    private onProgressUpdate: (progress: number) => void;
    private onError: (error: Error) => void;

    constructor(
        simulation: Simulation,
        onProgressUpdate: (progress: number) => void,
        onError: (error: Error) => void
    ) {
        this.simulation = simulation;
        this.observer = new Observer();
        this.cafeteria = new Cafeteria(
            simulation.parameters.internalQueueLimit,
            this.observer
        );
        this.machine = new EventMachine(this.observer);
        this.randomGenerator = new GaussianRandom();
        this.onProgressUpdate = onProgressUpdate;
        this.onError = onError;
        
        // Configurar cafeteria com os parâmetros da simulação
        this.cafeteria.getHall().setMaxHallCapacity(simulation.parameters.tableLimit);
        this.cafeteria.getService().middleTimeService = simulation.parameters.servingTime;
        
        this.configureStudentArriving();
    }

    private configureStudentArriving() {
        let currentTime = 0;
        for(let i = 0; i < this.simulation.parameters.studentCount; i++) {
            const student = new Student(
                `${i + 1}`, 
                this.simulation.parameters.registrationTime,
                this.simulation.parameters.registrationTime // middleTypingTime
            );
            
            const arrivingEvent = new StudentArrivingToTheExternalQueue(
                currentTime, 
                this.cafeteria, 
                this.machine, 
                student,
                this.randomGenerator
            );
            
            this.machine.addEvent(arrivingEvent);
            currentTime += this.simulation.parameters.serviceInterval;
        }
    }

    public executeSimulation() {
        try {
            const startTime = Date.now();
            
            while (this.machine.hasEvents()) {
                this.machine.processEvents();
                const progress = (this.machine.getProcessedEventsCount() / this.simulation.parameters.studentCount) * 100;
                this.onProgressUpdate(Math.min(progress, 100));
            }
            
            const endTime = Date.now();
            this.observer.setSimulationDuration(endTime - startTime);
        } catch (error) {
            this.onError(error as Error);
        }
    }

    public getResults(): SimulationResults {
        return this.observer.computeResults();
    }
} 