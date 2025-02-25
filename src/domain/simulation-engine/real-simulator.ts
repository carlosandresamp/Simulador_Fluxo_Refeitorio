import { Simulation } from "../data-management/Entities/simulation";
import { SimulatorI } from "../../adapter/interfaces/simulator-interface";
import { Cafeteria } from "./system/cafeteria";
import { Student } from "./system/student";
import { EventMachine } from "./events/eventMachine";
import { StudentArrivingToTheExternalQueue } from "./events/studentArrivingToTheExternalQueue";
import { SimulationResults } from "../data-management/Entities/simulation-results";
import { GaussianRandom } from "../utils/random-generators";
import { Observer } from "./simulator/observer";
import { MetricOverTimeImpl } from "../data-management/Entities/metric-over-time";

export class RealSimulator implements SimulatorI {
    private cafeteria: Cafeteria;
    private eventMachine: EventMachine;
    private observer: Observer;
    private isRunning: boolean = false;

    constructor() {
        this.observer = new Observer();
        this.cafeteria = new Cafeteria(20, this.observer);
        this.eventMachine = new EventMachine();
    }

    startSimulation(
        simulation: Simulation,
        onProgressUpdate: (progress: number) => void,
        onError: (error: Error) => void
    ): () => void {
        try {
            const startTime = Date.now();
            this.isRunning = true;
            const params = simulation.parameters;

            // Configurar cafeteria
            this.cafeteria = new Cafeteria(params.internalQueueLimit, this.observer);
            this.cafeteria.getHall().setMaxHallCapacity(params.tableLimit);
            this.cafeteria.getService().middleTimeService = params.servingTime;

            // Gerar eventos de chegada dos estudantes em ordem cronológica
            let currentTime = 0;
            for (let i = 0; i < params.studentCount; i++) {
                const student = new Student(`${i + 1}`, params.registrationTime);
                
                // Usar currentTime para garantir ordem cronológica
                const event = new StudentArrivingToTheExternalQueue(
                    currentTime,
                    this.cafeteria,
                    this.eventMachine,
                    student,
                    new GaussianRandom()
                );
                
                this.eventMachine.addEvent(event);
                // Incrementar o tempo para o próximo evento
                currentTime += params.serviceInterval;
            }

            // Processar eventos
            while (this.eventMachine.hasEvents() && this.isRunning) {
                this.eventMachine.processEvents();
                const progress = (this.eventMachine.getProcessedEventsCount() / params.studentCount) * 100;
                onProgressUpdate(Math.min(progress, 100));
            }

            if (this.isRunning) {
                const endTime = Date.now();
                this.observer.setSimulationDuration(endTime - startTime);
                simulation.results = this.observer.computeResults();
                simulation.status = "completed";
                onProgressUpdate(100);
            }

            return () => {
                this.isRunning = false;
            };
        } catch (error) {
            console.error("Erro na simulação:", error);
            onError(error as Error);
            return () => {
                this.isRunning = false;
            };
        }
    }
} 