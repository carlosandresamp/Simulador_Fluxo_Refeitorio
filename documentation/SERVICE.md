# Classe `Service`
- A classe Service representa o serviço de atendimento no refeitório, responsável por gerenciar o processo de servir refeições aos estudantes. Inclui funcionalidades de fila, bloqueio de serviço e cálculo de tempo de atendimento usando distribuição gaussiana.

```typescript
import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';

export class Service {
    private employeeId: string;
    private employeeName: string;
    private averageServiceTime: number;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null;
    private serviceQueue: Student[];
    private isServiceBlocked: boolean;
    // ... resto do código
}
```

## Importações
```typescript
import { Student } from './student';
import { GaussianRandom } from '../util/random-generators';
```
- **Descrição**:
    - Importa a classe `Student` para gerenciar os estudantes
    - Importa `GaussianRandom` para gerar tempos de serviço mais realistas

### Propriedades da Classe `Service`
```typescript
    private employeeId: string;
    private employeeName: string;
    private averageServiceTime: number;
    private randomGenerator: GaussianRandom;
    private currentStudent: Student | null;
    private serviceQueue: Student[];
    private isServiceBlocked: boolean;
```
- **Propriedades**:
    - `employeeId`: Identificador único do funcionário (privado)
    - `employeeName`: Nome do funcionário (privado)
    - `averageServiceTime`: Tempo médio de atendimento em segundos (privado)
    - `randomGenerator`: Gerador de números aleatórios gaussianos (privado)
    - `currentStudent`: Estudante sendo atualmente atendido (privado)
    - `serviceQueue`: Fila de estudantes aguardando atendimento (privado)
    - `isServiceBlocked`: Estado de bloqueio do serviço (privado)

### Construtor da Classe `Service`
```typescript
    constructor() {
        this.employeeId = "EMP001";
        this.employeeName = "Default Employee";
        this.averageServiceTime = 5;
        this.randomGenerator = new GaussianRandom();
    }
```
- **Descrição**:
    Inicializa um novo serviço com valores padrão:
    - Define ID do funcionário como "EMP001"
    - Define nome do funcionário como "Default Employee"
    - Define tempo médio de serviço como 5 segundos
    - Inicializa o gerador de números aleatórios

## Métodos da Classe `Service`

### Método `serveFood()`
```typescript
    serveFood(student: Student): void {
        if (this.isServiceBlocked) {
            console.log("Serviço está bloqueado. Não é possível atender estudantes.");
            return;
        }
        // ... resto do código
    }
```
- **Descrição**:
    - Realiza o atendimento de um estudante
    - Verifica se o serviço está bloqueado
    - Calcula o tempo de atendimento
    - Atualiza o status do estudante para "EATING"

### Métodos de Gerenciamento de Fila
```typescript
    addStudentToQueue(student: Student): void
    getCurrentStudent(): Student | null
    getNextStudent(): Student | null
    isServiceQueueEmpty(): boolean
```
- **Descrição**:
    - `addStudentToQueue`: Adiciona um estudante à fila de espera
    - `getCurrentStudent`: Retorna o estudante atual em atendimento
    - `getNextStudent`: Remove e retorna o próximo estudante da fila
    - `isServiceQueueEmpty`: Verifica se a fila está vazia

### Métodos de Controle de Serviço
```typescript
    unblockService(): void
    isServiceCurrentlyBlocked(): boolean
    clearCurrentStudent(): void
```
- **Descrição**:
    - `unblockService`: Desbloqueia o serviço
    - `isServiceCurrentlyBlocked`: Verifica se o serviço está bloqueado
    - `clearCurrentStudent`: Remove o estudante atual do atendimento

### Métodos de Cálculo de Tempo
```typescript
    private calculateServiceTime(): number {
        const variationFactor = this.randomGenerator.next();
        const minFactor = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variationFactor * (maxFactor - minFactor);
        return this.averageServiceTime * scaledFactor;
    }

    getServiceTime(): number
```
- **Descrição**:
    - `calculateServiceTime`: Calcula o tempo de serviço usando distribuição gaussiana
        - Usa fatores de variação entre 0.8 e 1.2 do tempo médio
        - Gera tempos mais realistas com variação natural
    - `getServiceTime`: Método público para acessar o tempo de serviço calculado