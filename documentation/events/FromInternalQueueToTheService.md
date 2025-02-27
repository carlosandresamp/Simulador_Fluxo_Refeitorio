# Classe `FromInternalQueueToTheService`
- Evento responsável por mover o estudante da fila interna para o atendimento.

```typescript
export class FromInternalQueueToTheService extends Event {
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
    - Verifica disponibilidade do serviço e mesas
    - Remove estudante da fila interna
    - Adiciona estudante à fila de atendimento
    - Inicia serviço de alimentação
    - Agenda próximo evento (FromServiceToTheTable)
    - Registra logs do processo 