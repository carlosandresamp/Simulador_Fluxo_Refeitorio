import { Simulation } from "../data-management/Entities/simulation";
import { SimulatorI } from "./simulator-interface";
import { Cafeteria } from "./system/cafeteria";
import { Student } from "./system/student";
import { EventMachine } from "./events/eventMachine";
import { FromExternalQueueToTurnstile } from "./events/fromExternalQueueToTurnstile";
import { SimulationResults, MetricOverTime } from "../data-management/Entities/simulation-results";

export class RealSimulator implements SimulatorI {
    private cafeteria: Cafeteria;
    private eventMachine: EventMachine;
    private isRunning: boolean = false;
    private results: SimulationResults = new SimulationResults(
        [], // intertalQueueSizeOverTime
        [], // externalQueueSizeOverTime
        [], // tableOccupancyOverTime
        0,  // averageWaitTime
        0,  // avgExternalQueue
        0,  // avgInternalQueue
        0,  // maxTableOccupancy
        0,  // simulationDuration
        0   // simulationDurationReal
    );

    constructor() {
        this.cafeteria = new Cafeteria(20); // Tamanho padrão da fila interna
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
            
            // Validar parâmetros
            if (params.studentCount <= 0 || 
                params.serviceInterval <= 0 || 
                params.registrationTime <= 0 || 
                params.servingTime <= 0 || 
                params.tableTime <= 0 || 
                params.internalQueueLimit <= 0 || 
                params.tableLimit <= 0) {
                throw new Error("Parâmetros inválidos");
            }
            
            const totalDuration = 5000; // 5 segundos
            const updateInterval = 200; // Atualiza a cada 200ms
            let currentTime = 0;
            let lastProcessedCount = 0;

            // Resetar estado
            this.eventMachine = new EventMachine();
            this.cafeteria = new Cafeteria(params.internalQueueLimit);
            
            console.clear();
            console.log("=== Iniciando Simulação ===\n");
            
            // Configurar cafeteria
            this.cafeteria.getHall().setMaxHallCapacity(params.tableLimit);
            this.cafeteria.getService().middleTimeService = params.servingTime;
            this.cafeteria.getHall().setOccupationTime(params.tableTime);

            // ... resto do código igual ...

            // Atualizar métricas
            const collectMetrics = () => {
                this.results.externalQueueSizeOverTime.push(
                    new MetricOverTime(currentTime, this.cafeteria.getExternalQueue().studentQuantity.length)
                );
                
                this.results.intertalQueueSizeOverTime.push(
                    new MetricOverTime(currentTime, this.cafeteria.getInternalQueue().studentQuantity.length)
                );
                
                this.results.tableOccupancyOverTime.push(
                    new MetricOverTime(currentTime, this.cafeteria.getHall().getOccupiedCapacity())
                );
            };

            // ... resto do código igual ...

        } catch (error) {
            console.error("Erro na simulação:", error);
            onError(error as Error);
            return () => {
                this.isRunning = false;
            };
        }
    }
} 