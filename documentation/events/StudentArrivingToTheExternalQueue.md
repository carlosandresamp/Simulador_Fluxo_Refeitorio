# Classe `StudentArrivingToTheExternalQueue`
- Evento responsável por gerenciar a chegada de estudantes na fila externa do refeitório.

```typescript
export class StudentArrivingToTheExternalQueue extends Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;
    private student: Student;
    private randomGenerator: RandomGeneratorI;
}
```

## Propriedades
```typescript
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;
    private student: Student;
    private randomGenerator: RandomGeneratorI;
```
- **Descrição**:
    - `timestamp`: Momento da chegada do estudante
    - `cafeteria`: Referência ao sistema da cafeteria
    - `machine`: Máquina de eventos da simulação
    - `student`: Estudante que está chegando
    - `randomGenerator`: Gerador de números aleatórios

## Construtor
```typescript
constructor(
    timestamp: number,
    cafeteria: Cafeteria,
    machine: EventMachine,
    student: Student,
    randomGenerator: RandomGeneratorI
)
```
- **Descrição**:
    - Inicializa o evento com dados necessários
    - Configura o estudante e seu tempo de chegada

## Métodos

### Método `processEvent`
```typescript
processEvent(): void
```
- **Descrição**:
    - Adiciona estudante à fila externa
    - Verifica se catraca está acessível
    - Agenda próximo evento (GetOutFromExternalQueueToTheTurnstile)
    - Registra logs de chegada do estudante
