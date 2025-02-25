import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationRepositoryI } from "./interfaces/simulation-repository-interface";
import { SimulationManagementAdapterI } from "@/view/interfaces/simulation-management-adapter-interface";

export class SimulationManagementAdapter implements SimulationManagementAdapterI {
  private repository: SimulationRepositoryI;

  constructor(repository: SimulationRepositoryI) {
    this.repository = repository;
  }

  /**
   * Cria uma nova simulação.
   * @param simulation - A simulação a ser criada.
   * @returns Uma promessa que resolve para a simulação criada ou undefined em caso de falha.
   */
  async createSimulation(simulation: Simulation): Promise<Simulation | undefined> {

    await this.repository.save(simulation);
    return simulation;
  }

  /**
   * Atualiza uma simulação existente.
   * @param simulation - A simulação a ser atualizada.
   * @returns Uma promessa que resolve para a simulação atualizada ou undefined em caso de falha.
   */
  async updateSimulation(simulation: Simulation): Promise<void> {
    try {
      await this.repository.updateSimulation(simulation);
    } catch (error) {
      console.error("Erro ao atualizar simulação:", error);
      throw error;
    }
  }

  /**
   * Deleta uma simulação pelo ID.
   * @param id - O ID da simulação a ser deletada.
   * @returns Uma promessa que resolve para true se a simulação foi deletada com sucesso, ou false em caso de falha.
   */
  async deleteSimulation(id: string): Promise<boolean> {
    try {
      this.repository.delete(id);
      return true;
    } catch (e) {
      return false;
    }

  }

  /**
   * Obtém todas as simulações.
   * @returns Uma promessa que resolve para uma lista de todas as simulações.
   */
  getAllSimulations(): Promise<Simulation[]> {
    return this.repository.getAll();
  }

  /**
  * Obtém uma simulação pelo ID.
  * @param id - O ID da simulação a ser obtida.
  * @returns Uma promessa que resolve para a simulação obtida ou null se não for encontrada.
  */
  async getSimulation(id: string): Promise<Simulation | null> {
    try {
      const simulation = await this.repository.getById(id);
      return simulation || null;
    } catch (error) {
      console.error("Erro ao obter simulação:", error);
      return null;
    }
  }

  getSimulationSync(id: string): Simulation | null {
    try {
      return this.repository.getByIdSync(id);
    } catch (error) {
      console.error("Erro ao obter simulação:", error);
      return null;
    }
  }
}