# Classe `SimulationRepositoryMock`
- Implementa persistência de simulações usando localStorage do navegador.

```typescript
export class SimulationRepositoryMock implements SimulationRepositoryI {
    private localeStorageKey: string = "simulation";
}
```

## Métodos Principais

### Métodos de Persistência
```typescript
async save(simulation: Simulation): Promise<void>
async getById(id: string): Promise<Simulation | null>
async getAll(): Promise<Simulation[]>
async delete(id: string): Promise<void>
```
- **Descrição**:
    - `save`: Salva ou atualiza simulação
    - `getById`: Recupera simulação por ID
    - `getAll`: Lista todas simulações
    - `delete`: Remove simulação específica

### Métodos Auxiliares
```typescript
private savingLocaleStorage(simulation: Simulation[]): void
private getAllFromLocaleStorage(): Simulation[]
```
- **Descrição**:
    - `savingLocaleStorage`: Persiste dados no localStorage
    - `getAllFromLocaleStorage`: Recupera dados do localStorage 