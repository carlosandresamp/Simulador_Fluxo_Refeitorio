# Classe `Turnstile`.

- O código a seguir implementa uma classe chamada `Turnstile`, que simula o funcionamento de uma catraca eletrônica. A catraca permite o registro de um aluno (`Student`) e controla o acesso com base no registro ou matrícula, incluindo funcionalidades de bloqueio.

```Typescript
import { Student } from "./student";

export class Turnstile {
    protected accessible: boolean;
    private student: Student | null;
    private isBlocked: boolean;

    constructor() {
        this.accessible = false;
        this.student = null;
        this.isBlocked = false;
    }

    calculateRegisterTime(): number {
        const registeringTime = this.student?.simulateTypingTime() || 0;
        return Math.random() * registeringTime;
    }

    registerStudent(student: Student): boolean {
        if (this.isBlocked) {
            console.log("Catraca está bloqueada. Não é possível registrar o aluno.");
            return false;
        }
        this.student = student;
        console.log(`Matrícula ${student.getRegister()} registrada.`);
        this.accessible = true;
        return true;
    }

    removeStudent(): Student {
        const student = this.student;
        if (!student) {
            throw new Error("Não é possível remover um aluno. Nenhum aluno está registrado.");
        }
        console.log(`Aluno ${student.getRegister()} removido da catraca.`);
        this.student = null;
        this.accessible = false;
        return student;
    }

    blockTurnstile(): void {
        this.isBlocked = true;
        console.log("Catraca bloqueada administrativamente.");
    }

    unblockTurnstile(): void {
        this.isBlocked = false;
        console.log("Catraca desbloqueada.");
    }

    isTurnstileBlocked(): boolean {
        return this.isBlocked;
    }

    isTurnstileAccessible(): boolean {
        return this.accessible;
    }

    getAccessible(): boolean {
        return this.accessible;
    }

    setAccessible(value: boolean): void {
        this.accessible = value;
    }

    getStudent(): Student | null {
        return this.student;
    }

    setStudent(student: Student | null): void {
        this.student = student;
    }
}
```
---

### Importação da classe `Student`.
```typescript
import { Student } from "./student";
```
- A linha acima importa a classe `Student` de um arquivo chamado `student.ts`. Essa classe representa um aluno que contém métodos e propriedades relacionados ao aluno, como a matrícula.
---
### Definição da Classe `Turnstile`.
```typescript
export class Turnstile {...}
```
- A palavra-chave `export` torna a classe `Turnstile` disponível para ser importada em outros módulos.
---
### Propriedades da Classe `Turnstile`.
```typescript
    protected accessible: boolean;
    private student: Student | null;
    private isBlocked: boolean;
```
- **Explicação**:
    - `accessible: boolean`: É uma propriedade protegida que indica se a catraca está liberada (`true`) ou bloqueada (`false`).
    - `student: Student | null`: Propriedade privada que armazena uma instância da classe `Student` ou null. Ela guarda o aluno que está passando pela catraca.
    - `isBlocked: boolean`: Propriedade privada que indica se a catraca está bloqueada administrativamente.
### Construtor da Classe `Turnstile`.

```typescript
    constructor() {
        this.accessible = false;
        this.student = null;
        this.isBlocked = false;
    }
```
- **Explicação**:
    O construtor inicializa as propriedades da classe:
    - `this.accessible = false`: indica que a catraca está bloqueada inicialmente
    - `this.student = null`: indica que não há aluno associado inicialmente
    - `this.isBlocked = false`: indica que a catraca não está bloqueada administrativamente

## Métodos da Classe `Turnstile`.

### Métodos de Acesso (Getters e Setters)
```typescript
    getAccessible(): boolean
    setAccessible(value: boolean): void
    getStudent(): Student | null
    setStudent(student: Student | null): void
```
- **Explicação**:
    Métodos que permitem acessar e modificar as propriedades privadas e protegidas da classe de forma controlada.

### Método `calculateRegisterTime()`
```typescript
    calculateRegisterTime(): number {
        const registeringTime = this.student?.simulateTypingTime() || 0;
        return Math.random() * registeringTime;
    }
```
- **Explicação**:
    Este método simula o tempo que um aluno leva para digitar sua matrícula na catraca.
    - Utiliza o método `simulateTypingTime()` do aluno atual
    - Retorna um tempo aleatório baseado no tempo de digitação do aluno
    ---

### Método `registerStudent()`
```typescript
    registerStudent(student: Student): boolean {
        if (this.isBlocked) {
            console.log("Catraca está bloqueada. Não é possível registrar o aluno.");
            return false;
        }
        // ... resto do código
    }
```
- **Explicação**:
    Este método registra um aluno na catraca:
    - Verifica se a catraca está bloqueada
    - Verifica se já existe um aluno registrado
    - Registra o novo aluno se as verificações passarem
    - Retorna `true` se o registro for bem-sucedido, `false` caso contrário

### Método `removeStudent()`
```typescript
    removeStudent(): Student {
        const student = this.getStudent();
        if (!student) {
            throw new Error("Não é possível remover um aluno. Nenhum aluno está registrado.");
        }
        // ... resto do código
    }
```
- **Explicação**:
    Este método remove o aluno atual da catraca:
    - Verifica se existe um aluno registrado
    - Remove o aluno e bloqueia a catraca
    - Retorna o aluno removido
    - Lança um erro se não houver aluno para remover

### Métodos de Controle de Bloqueio
```typescript
    blockTurnstile(): void
    unblockTurnstile(): void
    isTurnstileBlocked(): boolean
    isTurnstileAccessible(): boolean
```
- **Explicação**:
    Métodos que controlam o estado de bloqueio da catraca:
    - `blockTurnstile()`: Bloqueia a catraca administrativamente
    - `unblockTurnstile()`: Desbloqueia a catraca
    - `isTurnstileBlocked()`: Verifica se a catraca está bloqueada
    - `isTurnstileAccessible()`: Verifica se a catraca está acessível para uso
