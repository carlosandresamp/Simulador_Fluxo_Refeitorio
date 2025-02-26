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
        this.eventMachine = new EventMachine(this.observer);
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

            // Configurar cafeteria com os parâmetros da simulação
            this.cafeteria = new Cafeteria(params.internalQueueLimit, this.observer);
            this.cafeteria.getHall().setMaxHallCapacity(params.tableLimit);
            this.cafeteria.getService().middleTimeService = params.servingTime;

            // Gerar eventos de chegada dos estudantes em ordem cronológica
            let currentTime = 0;
            for (let i = 0; i < params.studentCount; i++) {
                const student = new Student(
                    `${i + 1}`, 
                    params.registrationTime,
                    params.registrationTime  // middleTypingTime é o mesmo que registrationTime
                );
                
                const event = new StudentArrivingToTheExternalQueue(
                    currentTime,
                    this.cafeteria,
                    this.eventMachine,
                    student,
                    new GaussianRandom()
                );
                
                this.eventMachine.addEvent(event);
                currentTime += params.serviceInterval;
            }

            // Processar eventos
            const processEvents = async () => {
                while (this.eventMachine.hasEvents() && this.isRunning) {
                    await this.eventMachine.processEvents();
                    
                    // Atualizar progresso baseado no total de eventos
                    const progress = this.eventMachine.getProgress();
                    onProgressUpdate(Math.min(progress, 99));
                    
                    // Pequena pausa para visualização
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

                if (this.isRunning) {
                    const endTime = Date.now();
                    this.observer.setSimulationDuration(endTime - startTime);
                    simulation.results = this.observer.computeResults();
                    simulation.status = "completed";
                    console.log("\n[Simulação] Finalizada com sucesso!");
                    onProgressUpdate(100);
                }
            };

            processEvents();

            return () => {
                this.isRunning = false;
                console.log("\n[Simulação] Interrompida pelo usuário");
            };
        } catch (error) {
            console.error("\n[Simulação] Erro:", error);
            onError(error as Error);
            return () => {
                this.isRunning = false;
            };
        }
    }
} 