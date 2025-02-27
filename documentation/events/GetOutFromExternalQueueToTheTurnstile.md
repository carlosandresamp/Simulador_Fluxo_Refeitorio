# Classe `GetOutFromExternalQueueToTheTurnstile`
- Evento responsável por mover o estudante da fila externa para a catraca.

```typescript
export class GetOutFromExternalQueueToTheTurnstile extends Event {
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;
}
```

## Propriedades
```typescript
    private timestamp: number;
    private cafeteria: Cafeteria;
    private machine: EventMachine;
```
- **Descrição**:
    - `timestamp`: Momento da movimentação
    - `cafeteria`: Referência ao sistema da cafeteria
    - `machine`: Máquina de eventos da simulação

## Construtor
```typescript
constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine)
```
- **Descrição**:
    - Inicializa o evento com timestamp
    - Configura referências necessárias

## Métodos

### Método `processEvent`
```typescript
processEvent(): void
```
- **Descrição**:
    - Remove estudante da fila externa
    - Define estudante na catraca
    - Calcula tempo de registro
    - Registra matrícula do estudante
    - Agenda próximo evento (GetOutFromTurnstileToTheInternalQueue)
    - Registra logs do processo 