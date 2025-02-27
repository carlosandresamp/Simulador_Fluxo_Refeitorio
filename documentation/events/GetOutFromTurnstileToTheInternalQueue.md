# Classe `GetOutFromTurnstileToTheInternalQueue`
- Evento que gerencia a passagem do estudante da catraca para a fila interna.

```typescript
export class GetOutFromTurnstileToTheInternalQueue extends Event {
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
    - `timestamp`: Momento do evento
    - `cafeteria`: Sistema da cafeteria
    - `machine`: Máquina de eventos

## Métodos

### Método `processEvent`
```typescript
processEvent(): void
```
- **Descrição**:
    - Remove estudante da catraca
    - Adiciona à fila interna
    - Verifica capacidade da fila
    - Controla bloqueio da catraca
    - Agenda próximos eventos 