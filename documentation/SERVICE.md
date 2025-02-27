# Classe `Service`
- A classe Service representa o serviço de atendimento no refeitório, responsável por gerenciar o processo de servir refeições aos estudantes.

```typescript
import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';

export class Service {
    private employeeId: string;
    private employeeName: string;
    private middleTimeService: number;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null;
    private serviceQueue: Student[];
    private isServiceBlocked: boolean;
}
```

## Propriedades
```typescript
    private employeeId: string;
    private employeeName: string;
    private middleTimeService: number;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null;
    private serviceQueue: Student[];
    private isServiceBlocked: boolean;
```
- **Descrição**:
    - `employeeId`: Identificador único do funcionário
    - `employeeName`: Nome do funcionário
    - `middleTimeService`: Tempo médio de atendimento
    - `randomGenerator`: Gerador de números aleatórios gaussianos
    - `currentStudent`: Estudante atualmente sendo atendido
    - `serviceQueue`: Fila de estudantes aguardando atendimento
    - `isServiceBlocked`: Estado de bloqueio do serviço

## Construtor
```typescript
constructor() {
    this.employeeId = "EMP001";
    this.employeeName = "Default Employee";
    this.middleTimeService = 5;
    this.randomGenerator = new GaussianRandom();
    this.isServiceBlocked = true;
}
```
- **Descrição**:
    - Inicializa um novo serviço com valores padrão
    - Define funcionário padrão e tempo médio de serviço
    - Inicia com serviço bloqueado

## Métodos Principais

### Método `serveFood`
```typescript
serveFood(student: Student): void
```
- **Descrição**:
    - Atende um estudante servindo a refeição
    - Verifica se o serviço está bloqueado
    - Calcula tempo de atendimento
    - Atualiza status do estudante para "EATING"

### Métodos de Gerenciamento de Fila
```typescript
addStudentToQueue(student: Student): void
getCurrentStudent(): Student | null
getNextStudent(): Student | null
isServiceQueueEmpty(): boolean
```
- **Descrição**:
    - Gerenciam a fila de atendimento
    - Controlam adição e remoção de estudantes
    - Verificam estado da fila

### Métodos de Controle de Bloqueio
```typescript
unblockService(): void
setServiceCurrentlyBlocked(isBlocked: boolean): boolean
clearCurrentStudent(): void
```
- **Descrição**:
    - Controlam o estado de bloqueio do serviço
    - Gerenciam o estudante atual
    - Notificam mudanças de estado

### Métodos de Tempo
```typescript
private calculateServiceTime(): number
getServiceTime(): number
setMiddleTimeService(time: number): void
```
- **Descrição**:
    - Calculam e gerenciam tempos de serviço
    - Usam distribuição gaussiana para variação
    - Permitem configuração do tempo médio
