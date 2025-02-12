# Classe `Turnstile`.

- O código a seguir implementa uma classe chamada ``Turnstile``, que simula o funcionamento de uma catraca eletrônica. A catraca permite o registro de um aluno (``Student``) e controla o acesso com base no registro ou matrícula.

```Typescript
import { Student } from "./student";


export class Turnstile {
    accessable: boolean; 
    student: Student | null; 

    constructor() {
        this.accessable = false; 
        this.student = null; 

    calculateRegisterTime(): number {
        return Math.random() * 5; 
    }

    typeRegister(student:Student): void {
        this.student=student; 
        console.log(`Matrícula ${student.getRegister()} registrada.`); 
        this.accessable = true; 
    }

    removeStudent(): void {
        console.log(`Aluno ${this.student?.getRegister()} removido da catraca.`); 
        this.student = null; 
        this.accessable = false; 
    }
}
}
```
---

### Importação da classe `Student`.
```typescript
import { Student } from "./student";
```
- A linha acima importa a classe ``Student`` de um arquivo chamado ``student.ts``. Essa classe representa um aluno que contem métodos e propriedades relacionados ao aluno, como a matrícula.
---
### Definição da Classe ``Turnstile``.
```typescript
export class Turnstile {...}
```
- A palavra-chave ``export`` torna a classe `Turnstile` disponível para ser importada em outros módulos. E em seguida é declarada a classe ``class Turnstile``.
---
### Propriedades da Classe `Turnstile`.
```typescript
    accessable: boolean; 
    student: Student | null; 
```
- **Explicação**:
    - `accessable: boolean`: È uma propriedade booleana que indica se a catraca está liberada (`true`) ou bloqueada (`false`).

    - `sudent:Student | null`:  Propriedade que armazena uma instância da classe `Student` ou null. Ela guarda o aluno que está passando pela catraca. Quando não há aluno, o valor é `null`.
### Construtor da Classe `Turnstile`.

```typescript
    constructor() {
        this.accessable = false; 
        this.student = null;
    }
```
- **Explicação**:
    
    O método ``constructor`` é chamado automaticamente quando uma nova instância da classe ``Turnstile`` é criada. Ele inicializa as propriedades da classe:

    - `this.accessable = false;` é definido como `false`, indicando que a catraca esta bloqueada.

    - `this.student = null;` é definido como `null`, pois inicialmente não há aluno asociado á catraca.

## Métodos da Classe `Turnstile`.
- Método `calculateRegisterTime()`
    
```typescript
    calculateRegisterTime(): number {
        return Math.random() * 5; 
    }
```
- **Explicação**:

    Este método simula o tempo que um aluno leva para digitar sua matrícula na catraca.
    - `Math.random()` gera um número aleatório entre 0 e 1.
    - Multiplicando por 5, o tempo ira variar entre 0 e 5 segundos.
    - E o valor é retornado como um número (`number`).
    ---

- Método `typeRegister(student: Student):`
```typescript
    typeRegister(student: Student): void {
        this.student = student;  
        this.accessable = true; 
    }
```
- **Explicação**:

    Este método registra a matrícula de um aluno na catraca e libera a passagem.

    - Esse metodo recebe um parâmetro `student` do tipo `Student`.

    - Associa o aluno à propriedade `student` da classe `catraca`.
    - Define `accessable` como `true`, liberando a passagem.

- Método `removeStudent()`
```typescript
    removeStudent(): void { 
        this.student = null; 
        this.accessable = false; 
    }
```
- **Explicação**:

    Este método remove o aluno da catraca após a passagem e bloqueia a catraca novamente.

    - Define `student` como `null`, indicando que não há mais aluno associado à catraca.
    
    - Define `accessable` como `false`, bloqueando a passagem.
