# Classe `SimulationRepositoryMock`
- A classe `SimulationRepositoryMock` é responsável por simular operações de persistência de dados de simulações utilizando o `localStorage` do navegador.
```typescript
import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";
import { SmileIcon } from "lucide-react";
import { resolve } from "path";

export class SimulationRepositoryMock implements SimulationRepositoryI {
  private localeStorageKey:string = "simulation";

  async save(simulation: Simulation): Promise<void> {
    if (!simulation.id) {
      simulation.id = "mock-id" + Date.now();
    }

    let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
    let listSimulationsFounded: boolean = false;

    for (let i = 0; i < gettinSimulations.length; i++) {
      if (gettinSimulations[i].id === simulation.id) {
        gettinSimulations[i] = simulation;
        listSimulationsFounded = true;
        break; 
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

    return Promise.resolve();
  }

  _getCallLog(): string[] {
    return [];
  }

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
```
---
### Imports da Classe `SimulationRepositoryMock`

```typescript
import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";
import { SmileIcon } from "lucide-react";
import { resolve } from "path";
```
- `SimulationRepositoryI`: Interface que define os métodos que a classe `SimulationRepositoryMock` deve implementar.

- `Simulation`: Entidade que representa uma simulação.

- `SimulationParameters`: Entidade que representa os parâmetros de uma simulação.

- `SmileIcon`: Ícone da biblioteca `lucide-react` (não utilizado no código).

- `resolve`: Função do módulo `path` para resolver caminhos de arquivos (não utilizado no código).

## Classe `SimulationRepositoryMock`

```typescript
export class SimulationRepositoryMock implements SimulationRepositoryI {
```
- A classe SimulationRepositoryMock implementa a interface SimulationRepositoryI, simulando um repositório de simulações.

### Atributos
```typescript
private localeStorageKey: string = "simulation";
```
- `localeStorageKey`: Chave utilizada para armazenar e recuperar as simulações no `localStorage`.

## Métodos da classe `SimulationRepositoryMock`.

### Método `save`
```typescript
async save(simulation: Simulation): Promise<void> {
    if (!simulation.id) {
      simulation.id = "mock-id" + Date.now();
    }

    let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
    let listSimulationsFounded: boolean = false;

    for (let i = 0; i < gettinSimulations.length; i++) {
      if (gettinSimulations[i].id === simulation.id) {
        gettinSimulations[i] = simulation;
        listSimulationsFounded = true;
        break; 
      }
    }

    if (!listSimulationsFounded) {
      gettinSimulations.push(simulation);
      console.log("Simulação salva com sucesso");
    }

    this.savingLocaleStorage(gettinSimulations);
    return Promise.resolve();

  }
```
---
```typescript
async save(simulation: Simulation): Promise<void> {
```
- Salva uma simulação no `localStorage`. Se a simulação não tiver um `id`, um `id` mock é gerado.
---

```typescript
if (!simulation.id) {
  simulation.id = "mock-id" + Date.now();
}
```
- `simulation.id`: Se a simulação não tiver um `id`, um `id` mock é gerado usando o timestamp atual.
---

```typescript
let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
let listSimulationsFounded: boolean = false;
```
- `gettinSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `listSimulationsFounded`: Flag para indicar se a simulação já existe na lista.

---

```typescript
for (let i = 0; i < gettinSimulations.length; i++) {
  if (gettinSimulations[i].id === simulation.id) {
    gettinSimulations[i] = simulation;
    listSimulationsFounded = true;
    break;
  }
}
```
- **Loop `for`**: Itera sobre as simulações existentes para verificar se a simulação atual já existe.

- `break`: Sai do loop após encontrar a simulação.
---

```typescript
if (!listSimulationsFounded) {
  gettinSimulations.push(simulation);
  console.log("Simulação salva com sucesso");
}
```
- `if`: Se a simulação não foi encontrada na lista, ela é adicionada.

---

```typescript
this.savingLocaleStorage(gettinSimulations);
return Promise.resolve();
```
- `savingLocaleStorage`: Salva a lista atualizada de simulações no localStorage.

- `Promise.resolve()`: Retorna uma promessa resolvida.
---

### Método `getById`

```typescript
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
```
---

```typescript
async getById(id: string): Promise<Simulation | null> {
```
- Recupera uma simulação pelo `id`.
---

```typescript
let gettingSimulations: Simulation[] = this.getAllFromLocaleStorage();
let searchingSimulationById: number = gettingSimulations.findIndex(Simulation => Simulation.id == id);
let indexFound: number = searchingSimulationById;
```
- `gettingSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `searchingSimulationById`: Encontra o índice da simulação com o `id` especificado.

- `indexFound`: Armazena o índice encontrado.
---

```typescript
if (indexFound != -1) {
  return gettingSimulations[indexFound];
} else {
  return null;
}
```
- `if`: Se a simulação for encontrada, retorna a simulação. Caso contrário, retorna null.
---

### Método `getAll`
```typescript
async getAll(): Promise<Simulation[]> {
    let gettinSimulations:Simulation[] = this.getAllFromLocaleStorage();
    
    return Promise.resolve(gettinSimulations);
  }
```
---
```typescript
async getAll(): Promise<Simulation[]> {
```
- Recupera todas as simulações armazenadas no `localStorage`.

---

```typescript
let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
return Promise.resolve(gettinSimulations);
```
- `gettinSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `Promise.resolve`: Retorna uma promessa resolvida com a lista de simulações.
---


### Método `delete`
```typescript
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

    return Promise.resolve();
  }
```
---
```typescript
async delete(id: string): Promise<void> {
```
- Remove uma simulação pelo `id`.
---

```typescript
let dataBaseSimulations: Simulation[] = this.getAllFromLocaleStorage();
let thereIsSimulation: boolean = false;
```
- `dataBaseSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `thereIsSimulation`: Flag para indicar se a simulação foi encontrada.
---

```typescript
for (let i = 0; i < dataBaseSimulations.length; i++) {
  if (dataBaseSimulations[i].id == id) {
    dataBaseSimulations[i].id = id;
    thereIsSimulation = true;
    dataBaseSimulations.splice(i, 1);

    this.savingLocaleStorage(dataBaseSimulations);
    console.log("Simulação excluída com sucesso");
    break;
  }
}
```
- **Loop `for`**: Itera sobre as simulações existentes para encontrar e remover a simulação com o id especificado.

- `splice`: Remove a simulação da lista.

- `savingLocaleStorage`: Salva a lista atualizada de simulações no `localStorage`.

- `break`: Sai do loop após encontrar a simulação.
---

```typescript
return Promise.resolve();
```
- `Promise.resolve()`: Retorna uma promessa resolvida.
---

### Método `_getCallLog`
```typescript
_getCallLog(): string[] {
  return [];
}
```
- `_getCallLog`: Método opcional para verificar se as funções foram chamadas. Retorna um array vazio.
---
### Métodos de auxilio

```typescript
private savingLocaleStorage(simulation: Simulation[]) {
  let savingData: string = JSON.stringify(simulation);
  localStorage.setItem(this.localeStorageKey, savingData);
}
```
- `savingLocaleStorage`: Converte a lista de simulações em uma string JSON e a salva no `localStorage`.
---
```typescript
private getAllFromLocaleStorage(): Simulation[] {
  const listSimulations = localStorage.getItem(this.localeStorageKey);
  if (listSimulations != null) {
    return JSON.parse(listSimulations);
  } else {
    return [];
  }
}
```
- `getAllFromLocaleStorage`: Recupera a lista de simulações do `localStorage` e a converte de volta para um array de objetos `Simulation`. Se não houver dados, retorna um array vazio.