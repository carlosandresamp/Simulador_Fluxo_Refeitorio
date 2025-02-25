import { SimulatorI } from "../../../adapter/interfaces/simulator-interface";
import { Simulation } from "../../data-management/Entities/simulation";
import { RealSimulator } from "../real-simulator";

export class SystemSimulator implements SimulatorI {
    private simulator: SimulatorI;

    constructor() {
        this.simulator = new RealSimulator();
    }

    startSimulation(
        simulation: Simulation,
        onProgressUpdate: (progress: number) => void,
        onError: (error: Error) => void
    ): () => void {
        try {
            return this.simulator.startSimulation(
                simulation,
                onProgressUpdate,
                onError
            );
        } catch (error) {
            onError(error as Error);
            return () => {};
        }
    }
} 