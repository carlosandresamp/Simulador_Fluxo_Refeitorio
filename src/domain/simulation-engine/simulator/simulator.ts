import { SimulationParameters} from "@/domain/data-management/Entities/simulation-parameters";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationResults } from "@/domain/data-management/Entities/simulation-results";
import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "../events/eventMachine";
import { InternalQueue } from "../system/internalQueue";
import { ExternalQueue } from "../system/externalQueue";
import { Turnstile } from "../system/turnstile";
import { Service } from "../system/service";
import { Hall } from "../system/hall";
import { Student } from "../system/student";
import { StudentArrivingToTheExternalQueue } from "../events/studentArrivingToTheExternalQueue";
import { ExponentialRandom, RandomGeneratorI } from "../util/random-generators";

export class Simulator{
    private cafeteria:Cafeteria;
    private machine:EventMachine;
    private simulation:Simulation;
    private randomGenerator:RandomGeneratorI;

    constructor(simulation: Simulation){
        this.simulation = simulation;
        this.cafeteria = new Cafeteria(this.simulation.parameters.internalQueueLimit);
        this.machine = new EventMachine();
        this.randomGenerator = new ExponentialRandom(this.simulation.parameters.serviceInterval)
        this.configureStudentArriving();
    }

    private configureStudentArriving(){
        for(let i=0; i<this.simulation.parameters.studentCount; i++){
            const servingTime = Math.random() * 2 * this.simulation.parameters.servingTime;
            const student = new Student(servingTime);

            const arrivingInstant = Math.random() * this.simulation.parameters.serviceInterval;
            const arrivingEvent = new StudentArrivingToTheExternalQueue(arrivingInstant, this.cafeteria, this.machine, student, this.randomGenerator);
            this.machine.addEvent(arrivingEvent);
        }
    }

    public executeSimulation(){
        console.log("Simulação inicializada.");
        this.machine.processEvents();
        console.log("Simulação finalizada.");
    }

    public getSimulation(){
        return this.simulation;
    }
}