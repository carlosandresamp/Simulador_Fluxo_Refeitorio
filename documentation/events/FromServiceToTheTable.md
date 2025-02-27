# Classe `FromServiceToTheTable`
- Evento responsável por mover o estudante do atendimento para uma mesa disponível.

```typescript
export class FromServiceToTheTable extends Event {
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
    - Verifica disponibilidade de mesas
    - Bloqueia serviço se não houver mesas
    - Move estudante para mesa disponível
    - Agenda evento de saída (FromTableToHome)
    - Registra logs do processo 