import { SimulatorI } from "../../../adapter/interfaces/simulator-interface";
import { Simulation } from "../../data-management/Entities/simulation";
import { Simulator } from "./simulator";

export class SystemSimulator implements SimulatorI {
    startSimulation(
        simulation: Simulation, 
        onProgressUpdate: (progress: number) => void, 
        onError: (error: Error) => void
    ): () => void {
        try {
            const simulador = new Simulator(simulation);
            simulador.executeSimulation();
            simulation.results = simulador.getResults();
            onProgressUpdate(100);
            return () => {};
        } catch (error) {
            onError(error as Error);
            return () => {};
        }
    }
} 