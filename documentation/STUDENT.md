# Classe `Student`
- A classe Student representa um estudante no sistema de simulação do refeitório, gerenciando seu status, tempos e comportamentos durante todo o processo.

```typescript
import { GaussianRandom } from "../util/random-generators";

export type StudentStatus = 
    | "WAITING" 
    | "REGISTERING" 
    | "IN_QUEUE" 
    | "BEING_SERVED" 
    | "EATING" 
    | "LEAVING";

export class Student {
    private registration: string;
    private arrivalTime: Date;
    private serviceTime: Date;
    private status: StudentStatus;
    private registrationTime: number;
    private randomGenerator: GaussianRandom;
    private middleTypingTime: number;
}
```

## Tipos
```typescript
export type StudentStatus = 
    | "WAITING" 
    | "REGISTERING" 
    | "IN_QUEUE" 
    | "BEING_SERVED" 
    | "EATING" 
    | "LEAVING";
```
- **Descrição**:
    - Define os possíveis estados de um estudante no sistema
    - `WAITING`: Aguardando na fila externa
    - `REGISTERING`: Registrando matrícula na catraca
    - `IN_QUEUE`: Na fila interna
    - `BEING_SERVED`: Sendo atendido
    - `EATING`: Realizando refeição
    - `LEAVING`: Saindo do refeitório

## Propriedades
```typescript
    private registration: string;
    private arrivalTime: Date;
    private serviceTime: Date;
    private status: StudentStatus;
    private registrationTime: number;
    private randomGenerator: GaussianRandom;
    private middleTypingTime: number;
```
- **Descrição**:
    - `registration`: Número de matrícula do estudante
    - `arrivalTime`: Momento de chegada ao refeitório
    - `serviceTime`: Momento do início do atendimento
    - `status`: Estado atual do estudante
    - `registrationTime`: Tempo para registrar matrícula
    - `randomGenerator`: Gerador de números aleatórios
    - `middleTypingTime`: Tempo médio de digitação

## Construtor
```typescript
constructor(registration: string, registrationTime: number, middleTypingTime: number)
```
- **Descrição**:
    - Inicializa um novo estudante com:
        - Número de matrícula
        - Tempo de registro
        - Tempo médio de digitação
    - Define status inicial como "WAITING"
    - Inicializa gerador de números aleatórios

## Métodos

### Métodos de Acesso
```typescript
getRegistration(): string
setRegistration(newRegistration: string): void
getStatus(): StudentStatus
setStatus(newStatus: StudentStatus): void
getRegistrationTime(): number
getArrivalTime(): Date
getServiceTime(): Date
getMiddleTypingTime(): number
```
- **Descrição**:
    - Gerenciam acesso e modificação das propriedades
    - Validam alterações de status
    - Fornecem informações sobre tempos

### Métodos de Simulação
```typescript
simulateTypingTime(): number
exteernalQueueWaitingTime(): number
```
- **Descrição**:
    - `simulateTypingTime`: Calcula tempo de digitação usando distribuição gaussiana
    - `exteernalQueueWaitingTime`: Calcula tempo de espera na fila externa
    - Ambos usam variação entre 80% e 120% do tempo médio
