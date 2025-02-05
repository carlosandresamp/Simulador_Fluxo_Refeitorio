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
      simulation.id = "mock-id" + Date.now();
    }

    let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
    let listSimulationsFounded: boolean = false;

    for (let i = 0; i < gettinSimulations.length; i++) {
      if (gettinSimulations[i].id === simulation.id) {
        gettinSimulations[i] = simulation;
        listSimulationsFounded = true;
        break; // Sai do loop após encontrar a simulação
      }
    }

    if (!listSimulationsFounded) {
      gettinSimulations.push(simulation);
      console.log("Simulação salva com sucesso");
    }

    this.savingLocaleStorage(gettinSimulations);
    return Promise.resolve();

  }

  async getById(id: string): Promise<Simulation | null> {
    
    let gettingSimulations:Simulation[] = this.getAllFromLocaleStorage();
    let searchingSimulationById:number = gettingSimulations.findIndex(Simulation => Simulation.id == id)
    let indexFound:number = searchingSimulationById;

    if(indexFound != -1){
      return gettingSimulations[indexFound];
    }else{
      return null;
    }
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
}



