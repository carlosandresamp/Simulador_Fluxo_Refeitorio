import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationResults } from "@/domain/data-management/Entities/simulation-results";
import { SimulatorI } from "./interfaces/simulator-interface";
import { SimulationEngineAdapterI } from "@/view/interfaces/simulation-engine-adapter-interface";
import { SimulationManagementAdapterI } from "@/view/interfaces/simulation-management-adapter-interface";

/**
 * Adapter para o motor de simulação.
 * Implementa a interface SimulationEngineAdapterI.
 */
export class SimulationEngineAdapter implements SimulationEngineAdapterI {
  private simulator: SimulatorI;
  private management: SimulationManagementAdapterI;

  /**
   * Construtor da classe SimulationEngineAdapter.
   * @param simulator - Instância do simulador.
   * @param management - Instância do gerenciador de simulação.
   */
  constructor(simulator: SimulatorI, management: SimulationManagementAdapterI) {
    this.simulator = simulator;
    this.management = management;
  }

  /**
   * Inicia uma simulação.
   * @param simulation - A simulação a ser iniciada.
   * @param onProgressUpdate - Callback para atualizar o progresso da simulação.
   * @param onError - Callback para tratar erros durante a simulação.
   * @returns Uma função para cancelar a simulação.
   */
  startSimulation(
    simulation: Simulation,
    onProgressUpdate: (progress: number) => void,
    onError: (error: Error) => void
  ): () => void {
    try {
      simulation.status = "running";
      simulation.results = null;
      
      return this.simulator.startSimulation(
        simulation,
        async (progress) => {
          onProgressUpdate(progress);
          
          if (progress >= 100) {
            try {
              simulation.status = "completed";
              await this.management.updateSimulation(simulation);
            } catch (error) {
              console.error("Erro ao finalizar simulação:", error);
              onError(error as Error);
            }
          }
        },
        onError
      );
    } catch (error) {
      console.error("Erro ao iniciar simulação:", error);
      onError(error as Error);
      return () => {};
    }
  }

  async getSimulationResults(simulationId: string): Promise<SimulationResults | null> {
    try {
      const simulation = await this.management.getSimulation(simulationId);
      return simulation?.results || null;
    } catch (error) {
      console.error("Erro ao obter resultados:", error);
      return null;
    }
  }

  canViewResults(simulationId: string): boolean {
    try {
      const simulation = this.management.getSimulationSync(simulationId);
      if (!simulation) return false;
      
      return simulation.status === "completed" && simulation.results !== null;
    } catch (error) {
      console.error("Erro ao verificar resultados:", error);
      return false;
    }
  }
}