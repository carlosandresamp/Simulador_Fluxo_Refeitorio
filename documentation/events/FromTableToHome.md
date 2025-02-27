# Classe `FromTableToHome`
- Evento responsável por gerenciar a saída do estudante do refeitório após terminar a refeição.

```typescript
export class FromTableToHome extends Event {
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
    - `timestamp`: Momento de saída do estudante
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
    - Identifica estudante que terminou a refeição
    - Remove estudante da mesa
    - Atualiza status do estudante para "LEAVING"
    - Desbloqueia serviço se necessário
    - Registra logs de saída do estudante 