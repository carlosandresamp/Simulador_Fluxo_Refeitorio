# Classe `Turnstile`
- A classe Turnstile representa a catraca do refeitório, controlando o acesso dos estudantes e gerenciando o processo de registro de matrícula.

```typescript
import { Student } from "./student";

export class Turnstile {
    protected accessible: boolean;
    private student: Student | null;
    private isBlocked: boolean;
}
```

## Propriedades
```typescript
    protected accessible: boolean;
    private student: Student | null;
    private isBlocked: boolean;
```
- **Descrição**:
    - `accessible`: Indica se a catraca está acessível
    - `student`: Estudante atualmente na catraca
    - `isBlocked`: Estado de bloqueio administrativo

## Construtor
```typescript
constructor() {
    this.accessible = true;
    this.student = null;
    this.isBlocked = false;
}
```
- **Descrição**:
    - Inicializa catraca como acessível
    - Sem estudante inicial
    - Desbloqueada por padrão

## Métodos

### Métodos de Acesso
```typescript
getAccessible(): boolean
setAccessible(value: boolean): void
getStudent(): Student | null
setStudent(student: Student | null): void
```
- **Descrição**:
    - Controlam acesso e modificação das propriedades
    - Gerenciam estado da catraca
    - Manipulam estudante atual

### Métodos de Registro
```typescript
calculateRegisterTime(): number
registerStudent(student: Student): boolean
removeStudent(): Student
```
- **Descrição**:
    - `calculateRegisterTime`: Calcula tempo de registro
    - `registerStudent`: Registra novo estudante
    - `removeStudent`: Remove estudante atual

### Métodos de Controle
```typescript
blockTurnstile(): void
unblockTurnstile(): void
isTurnstileBlocked(): boolean
isTurnstileAccessible(): boolean
```
- **Descrição**:
    - Gerenciam bloqueio/desbloqueio
    - Verificam estado atual
    - Controlam acessibilidade
