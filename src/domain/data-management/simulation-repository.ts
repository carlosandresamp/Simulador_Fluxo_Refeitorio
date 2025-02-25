import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";
import { SmileIcon } from "lucide-react";
import { resolve } from "path";

export class SimulationRepositoryMock implements SimulationRepositoryI {
  private simulations: Map<string, Simulation> = new Map();

  //Chave primária para acesso ao localeStorage
  private localeStorageKey:string = "simulation";

  async save(simulation: Simulation): Promise<void> {
    // Garantir que a simulação tenha um ID
    if (!simulation.id) {
      simulation.id = "mock-id-" + Date.now();
    }
    
    // Salvar tanto no Map quanto no localStorage
    this.simulations.set(simulation.id, {...simulation});
    
    let simulations = this.getAllFromLocaleStorage();
    const index = simulations.findIndex(s => s.id === simulation.id);
    if (index >= 0) {
      simulations[index] = simulation;
    } else {
      simulations.push(simulation);
    }
    
    this.savingLocaleStorage(simulations);
    return Promise.resolve();
  }

  async getById(id: string): Promise<Simulation | null> {
    // Tentar obter do Map primeiro
    const simulation = this.simulations.get(id);
    if (simulation) {
      return simulation;
    }
    
    // Se não encontrar no Map, procurar no localStorage
    const simulations = this.getAllFromLocaleStorage();
    const found = simulations.find(s => s.id === id);
    if (found) {
      this.simulations.set(id, found); // Atualizar o Map
      return found;
    }
    
    return null;
  }

  async getAll(): Promise<Simulation[]> {
    let gettinSimulations:Simulation[] = this.getAllFromLocaleStorage();
    
    // Retorna array vazio
    return Promise.resolve(gettinSimulations);
  }

  async delete(id: string): Promise<void> {
    let dataBaseSimulations:Simulation[] = this.getAllFromLocaleStorage();
    let thereIsSimulation:boolean = false;

    for(let i=0; i<dataBaseSimulations.length; i++){
      if(dataBaseSimulations[i].id == id){
        dataBaseSimulations[i].id = id;
        thereIsSimulation = true;
        dataBaseSimulations.splice(i, 1);

        this.savingLocaleStorage(dataBaseSimulations);
        console.log("Simulação excluída com sucesso");
        break;
      }
    }

    // Simula sucesso sem ação real
    return Promise.resolve();
  }

  async updateSimulation(simulation: Simulation): Promise<void> {
    // Verificar se existe no Map ou no localStorage
    const exists = await this.getById(simulation.id);
    if (!exists) {
      throw new Error("Simulation not found");
    }

    // Atualizar em ambos os lugares
    this.simulations.set(simulation.id, {...simulation});
    
    let simulations = this.getAllFromLocaleStorage();
    const index = simulations.findIndex(s => s.id === simulation.id);
    if (index >= 0) {
      simulations[index] = simulation;
      this.savingLocaleStorage(simulations);
    }
    
    return Promise.resolve();
  }

  // Opcional: método para verificar se as funções foram chamadas
  _getCallLog(): string[] {
    return [];
  }

  //Métodos auxiliares do localestorage
  private savingLocaleStorage(simulation:Simulation[]){
    let savingData:string = JSON.stringify(simulation);
    localStorage.setItem(this.localeStorageKey, savingData);
  }
  
  private getAllFromLocaleStorage():Simulation[]{
    const listSimulations = localStorage.getItem(this.localeStorageKey);
    if(listSimulations != null){
      return JSON.parse(listSimulations);
    }else{
      return [];
    }
  }

  getByIdSync(id: string): Simulation | null {
    // Tentar obter do Map primeiro
    const simulation = this.simulations.get(id);
    if (simulation) {
      return simulation;
    }
    
    // Se não encontrar no Map, procurar no localStorage
    const simulations = this.getAllFromLocaleStorage();
    const found = simulations.find(s => s.id === id);
    if (found) {
      this.simulations.set(id, found); // Atualizar o Map
      return found;
    }
    
    return null;
  }
}



