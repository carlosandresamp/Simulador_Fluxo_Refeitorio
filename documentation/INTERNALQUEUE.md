# Classe `InternalQueue`
- A classe InternalQueue representa a fila interna do refeitório, com capacidade limitada e controle de acesso.

```typescript
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";

export class InternalQueue extends ExternalQueue {
    private maxCapacity: number;
    private sizeQueue: number;
    private middleWaitingTime: number;
    private randomGenerator: GaussianRandom;
    // ... resto do código
}
```

### Importações da Classe `InternalQueue`
```typescript
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";
import { GaussianRandom } from "../util/random-generators";
```
- **Descrição**:
    - `ExternalQueue`: Classe base que fornece funcionalidades básicas de fila
    - `Student`: Classe que representa um estudante
    - `GaussianRandom`: Classe para gerar números aleatórios com distribuição gaussiana

### Propriedades da Classe `InternalQueue`
```typescript
    private maxCapacity: number;
    private sizeQueue: number;
    private middleWaitingTime: number;
    private randomGenerator: GaussianRandom;
```
- **Descrição**:
    - `maxCapacity`: Limite máximo da fila
    - `sizeQueue`: Tamanho atual da fila
    - `middleWaitingTime`: Tempo médio de espera
    - `randomGenerator`: Gerador de tempos aleatórios

### Construtor da Classe `InternalQueue`
```typescript
    constructor(maxCapacity: number, students?: Student[]) {
        super(students);
        this.maxCapacity = maxCapacity;
        this.sizeQueue = maxCapacity;
    }
```
- **Descrição**:
    - Inicializa uma nova fila interna com capacidade máxima definida
    - Permite inicialização opcional com uma lista de estudantes
    - Chama o construtor da classe pai (ExternalQueue)

### Métodos de Gerenciamento de Capacidade
```typescript
    getMaxCapacity(): number
    setMaxCapacity(maxCapacity: number): void
    setMiddleWaitingTime(middleWaitingTime: number): void
```
- **Descrição**:
    - `getMaxCapacity`: Retorna a capacidade máxima da fila
    - `setMaxCapacity`: Define nova capacidade máxima (deve ser maior que zero)
    - `setMiddleWaitingTime`: Define o tempo médio de espera (deve ser maior que zero)

### Métodos de Gerenciamento de Estudantes
```typescript
    addStudent(student: Student): boolean
    removeStudent(): Student | null
    getLastStudent(): Student | null
```
- **Descrição**:
    - `addStudent`: Adiciona um estudante à fila se houver espaço
        - Retorna `true` se adicionado com sucesso, `false` caso contrário
    - `removeStudent`: Remove e retorna o próximo estudante da fila
        - Retorna `null` se a fila estiver vazia
    - `getLastStudent`: Retorna o último estudante da fila sem removê-lo

### Métodos de Verificação de Estado
```typescript
    emptyInternalQueue(): boolean
    isFull(): boolean
    isEmpty(): boolean
```
- **Descrição**:
    - `emptyInternalQueue`: Verifica se a fila está vazia
    - `isFull`: Verifica se a fila atingiu sua capacidade máxima
    - `isEmpty`: Verifica se não há estudantes na fila

### Método de Cálculo de Tempo
```typescript
    calculateWaitingTime(): number
```
- **Descrição**:
    - Calcula o tempo de espera usando distribuição gaussiana
    - Aplica variação entre 80% e 120% do tempo médio
    - Utiliza o gerador de números aleatórios gaussianos
    - Retorna o tempo de espera calculado

```typescript
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";

export class InternalQueue extends ExternalQueue {
  readonly maxCapacity: number;

  constructor(maxCapacity: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.maxCapacity = maxCapacity;
  }

  addStudent(student: Student): void {
    if(this.studentQuantity.length >= this.maxCapacity){
        throw new Error ("Fila interna cheia: espere esvaziar");
    }

    this.studentQuantity.push(student);
    console.log("Aluno entrou na Fila Interna");
  }

  removeStudent(): Student {
    const toRemoveStudent = super.removeStudent();
    console.log("Fila interna");
    return toRemoveStudent;
  }
}
```

### Importações da Classe `InternalQueue`.
```typescript
import { ExternalQueue } from "./externalQueue";
import { Student } from "./student";
```

- **Descrição**:
    - `ExternalQueue`: Classe que representa uma fila externa, da qual `InternalQueue` herda propriedades e métodos.

     - `Student`: Classe que representa um estudante, utilizada para manipular os elementos da fila.

### Definição da Classe `InternalQueue`:
- A classe `InternalQueue` é exportada para que possa ser utilizada em outros módulos. Ela estende a classe `ExternalQueue`, herdando suas propriedades e métodos.
---

### Propriedades da classe `InternalQueue`.

```typescript
  readonly maxCapacity: number;
```
- **Descrição**:

    A propriedade `maxCapacity` é um número que define a capacidade máxima da fila interna. Ela é marcada como `readonly`, o que significa que seu valor não pode ser alterado após a criação do objeto.

  ---

    ### Construtor da classe `InternalQueue`.
```typescript
      constructor(maxCapacity: number, studentQuantity?: Student[]) {
    super(studentQuantity);
    this.maxCapacity = maxCapacity;
  }
```
- **Descrição**:

    O construtor da classe `InternalQueue` é responsável por inicializar as propriedades do objeto. Ele recebe dois parâmetros:

    - `maxCapacity`: A capacidade máxima da fila interna.

    - `studentQuantity`: Uma lista de estudantes que pode ser passada para inicializar a fila.

- **Funcionamento**:

    - `super(studentQuantity)`: Chama o construtor da classe pai (ExternalQueue), passando a lista de estudantes (studentQuantity) para inicializar a fila.

    - `this.maxCapacity = maxCapacity`: Atribui o valor do parâmetro `maxCapacity` à propriedade `maxCapacity` da classe.
---
### Métodos da Classe `InternalQueue`.
- Método `addStudent(student: Student): void{`

```typescript
  addStudent(student: Student): void {
    if (this.studentQuantity.length >= this.maxCapacity) {
        throw new Error("Fila interna cheia: espere esvaziar");
    }

    this.studentQuantity.push(student);
    console.log("Aluno entrou na Fila Interna");
  }
```
- **Descrição**:

    O método `addStudent` adiciona um estudante à fila interna, desde que a capacidade máxima não seja excedida. Caso a fila esteja cheia, ele lança um erro.

- **Funcionamento**:

    - `if (this.studentQuantity.length >= this.maxCapacity)`: Verifica se o número de estudantes na fila (`studentQuantity.length`) é maior ou igual à capacidade máxima (maxCapacity).

    - `throw new Error("Fila interna cheia: espere esvaziar")`: Lança um erro caso a fila esteja cheia.

    - `this.studentQuantity.push(student)`: Adiciona o estudante (`student`) ao final da fila (`studentQuantity`).

    - `console.log("Aluno entrou na Fila Interna")`: Exibe uma mensagem no console informando que o estudante entrou na fila interna.

- Método `removeStudent():Student`
```typescript
  removeStudent(): Student {
    const toRemoveStudent = super.removeStudent();
    console.log("Fila interna");
    return toRemoveStudent;
  }
```
- **Descrição**:

    - O método `removeStudent` remove um estudante da fila interna. Ele utiliza o método `removeStudent` da classe pai (`ExternalQueue`) para realizar a remoção.

- **Funcionamento**:
    - `const toRemoveStudent = super.removeStudent()`: Chama o método `removeStudent` da classe pai (`ExternalQueue`) para remover e retornar o estudante da fila.

    - `console.log("Fila interna")`: Exibe uma mensagem no console indicando que a operação ocorreu na fila interna.

    - `return toRemoveStudent:` Retorna o estudante removido.