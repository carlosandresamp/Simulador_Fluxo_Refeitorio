### Classe `ExternalQueue`.
- A principio, a classe `ExternalQueue` representa uma fila externa que gerencia estudantes seguindo o princípio **FIFO (First-In, First-Out)** que significa "primeiro a entrar, primeiro a sair".

```typescript
import { error } from "console";
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";
import { throwDeprecation } from "process";
import { add } fro m "date-fns";
import { Student } from "./student";


export class ExternalQueue {
  protected studentQuantity: Student[];

  constructor(studentQuantity?: Student[]) {
    this.studentQuantity = studentQuantity ?? []; 

  protected addStudent(student: Student):void {
    this.studentQuantity.push(student);
    console.log("Novo aluno chegou a fila!");
  }

  protected removeStudent(): Student {
    if (this.studentQuantity.length === 0) {
      throw new Error("Não há alunos na fila");
    }
    
    const studentIndex = this.studentQuantity.shift();
    console.log("Aluno saiu da fila externa.");
    return studentIndex;
  }
}
```
### Imports da Classe `externalQueue`.

```typescript
import { error } from "console";
```
- **Descrição**:

    Importa a função error do módulo console. Essa função pode ser usada para exibir mensagens de erro no console.
---
```typescript
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";
```
- **Descrição**:

    Importa a classe `SimulationRepositoryMock` de um caminho específico. Essa classe é usada para simular operações de repositório relacionadas a simulações.
---

```typescript
import { throwDeprecation } from "process";

```
- **Descrição**:


    Importa a função `throwDeprecation` do módulo `process`. Essa função pode ser usada para lançar avisos de depreciação.
---

```typescript
import { add } from "date-fns";
```
- **Descrição**:
Importa a função `add` do módulo `date-fns`. Essa função é usada para manipulação de datas, como adicionar dias, meses, anos, etc.
---

```typescript
import { Student } from "./student";
```
- **Descrição**:


    Importa a classe `Student` de um módulo chamado `student`. A classe `Student` representa um estudante que pode ser adicionado à fila externa.
---

## Detalhes da Classe
- Definição da Classe `ExternalQueue`.
```typescript
export class ExternalQueue {
```
- **Descrição**:

    Define a classe ExternalQueue e a torna disponível para outros módulos através da palavra-chave export.
---

### Propriedades
```typescript
protected studentQuantity: Student[];
```
- Declara um atributo protegido chamado `studentQuantity`, que é um array de objetos do tipo `Student`. Este array armazena os estudantes que estão atualmente na fila externa.

## Construtor da Classe `externalQueue`

```typescript
constructor(studentQuantity?: Student[]) {
    this.studentQuantity = studentQuantity ?? [];
}
```
---
```typescript
  constructor(studentQuantity?: Student[]) {
```
- **Descrição**:
---

```typescript
  constructor(studentQuantity?: Student[]) {
```
- **Descrição**:
Define o construtor da classe `ExternalQueue`, que recebe um parâmetro opcional `studentQuantity`, que é um array de objetos do tipo `Student`.
---

```typescript
    this.studentQuantity = studentQuantity ?? [];

```
- **Descrição**:
Inicializa o atributo `studentQuantity` com o valor passado como argumento ao construtor. Se nenhum valor for passado, o array é inicializado como vazio (`[]`). O operador `??` (nullish coalescing) assegura que o valor padrão seja usado caso `studentQuantity` seja `null` ou `undefined`.
---

## Métodos da Classe `externalQueue`.

- ` protected addStudent(student: Student): void {`

```typescript
 protected addStudent(student: Student):void {
    this.studentQuantity.push(student);
    console.log("Novo aluno chegou a fila!");
  }
```
---
```typescript
  protected addStudent(student: Student): void {

```
- **Descrição**:

    Define um método protegido chamado `addStudent`, que recebe um parâmetro do tipo `Student` e não retorna nenhum valor (`void`). Este método adiciona um estudante à fila externa.
---

```typescript
    this.studentQuantity.push(student);
```
- **Descrição**:

    Adiciona o estudante ao array `studentQuantity` usando o método `push`.
---
- `protected removeStudent()`
```typescript
protected removeStudent(): Student {
    if (this.studentQuantity.length === 0) {
      throw new Error("Não há alunos na fila");
    }

     const studentIndex = this.studentQuantity.shift();
    console.log("Aluno saiu da fila externa.");
    return studentIndex;
  }
}
```
---

```typescript
  protected removeStudent(): Student {
```
- **Descrição**:

    Define um método protegido chamado `removeStudent`, que não recebe parâmetros e retorna um objeto do tipo `Student`. Este método remove um estudante da fila externa.
---

```typescript
    if (this.studentQuantity.length === 0) {
```
- **Descrição**:
    
    Verifica se o array `studentQuantity` está vazio.
---

```typescript
    throw new Error("Não há alunos na fila");
```
- **Descrição**:

    Lança um erro com a mensagem "Não há alunos na fila" se o array estiver vazio.
---

```typescript
    const studentIndex = this.studentQuantity.shift();
```
- **Descrição**:

    Remove o primeiro estudante do array `studentQuantity` usando o método `shift`, que segue o conceito de **FIFO** (First In, First Out).
---

```typescript
    return studentIndex;
```
- **Descrição**:

    Retorna o estudante removido da fila.
---