import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";
import { SmileIcon } from "lucide-react";
import { resolve } from "path";

export class SimulationRepositoryMock implements SimulationRepositoryI {
  //Chave primária para acesso ao localeStorage
  private localeStorageKey:string = "simulation";

  async save(simulation: Simulation): Promise<void> {
    // Simula sucesso sem armazenar
    if (!simulation.id) {
      simulation.id = "mock-id";
    }

    let savingDataSimulations = this.getAllFromLocaleStorage();
    savingDataSimulations.push(simulation);
    this.savingLocaleStorage(savingDataSimulations);
    
    return Promise.resolve()
  }

  async getById(id: string): Promise<Simulation | null> {
    // Retorna um objeto vazio para manter a interface
    return Promise.resolve(new Simulation("mockid","mockname",new SimulationParameters(0,0,0,0,0,0,0,0,"normal")));
  }

  async getAll(): Promise<Simulation[]> {
    // Retorna array vazio
    return Promise.resolve([]);
  }

  async delete(id: string): Promise<void> {
    // Simula sucesso sem ação real
    return Promise.resolve();
  }

  // Opcional: método para verificar se as funções foram chamadas
  _getCallLog(): string[] {
    return [];
  }

  //Funções auxiliares do localestorage
  private savingLocaleStorage(simulation:Simulation[]){
    localStorage.setItem(this.localeStorageKey, JSON.stringify(simulation));
  }
  
  private getAllFromLocaleStorage():Simulation[]{
    const listSimulations = localStorage.getItem(this.localeStorageKey);
    return listSimulations ? JSON.parse(listSimulations) :[];
  }

}


