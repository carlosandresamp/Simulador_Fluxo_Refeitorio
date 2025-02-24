import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { Simulator } from "./simulator";

export class SystemSimulator implements SimulatorI{
    
    startSimulation(simulation: Simulation, onProgressUpdate: (progress: number) => void, onError: (error: Error) => void): () => void {
       // Executar simulacao
        const simulador = new Simulator(simulation);
        simulador.executeSimulation();

       onProgressUpdate(100);

       return ()=>{};
    }

}