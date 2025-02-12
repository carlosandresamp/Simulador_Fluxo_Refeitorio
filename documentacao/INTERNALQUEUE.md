# Classe `InternalQueue`.
- A classe InternalQueue representa uma fila interna de estudantes, que herda propriedades e métodos de uma fila externa (ExternalQueue). Ela adiciona uma capacidade máxima à fila e implementa métodos para adicionar e remover estudantes. Abaixo, detalha-se cada parte do código.

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