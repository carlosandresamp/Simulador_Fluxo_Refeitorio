# Classe `Hall`.
- A classe `Hall` representa um espaço fisico (como um salão, auditório ou sala) com capacidade limitada para acomodar os estudantes.
- ### A classe Hall oferece funcionalidades para:
    - Controlar a capacidade máxima de ocupação.
    - Gerenciar estudantes dentro do espaço.
    - Remover automaticamente estudantes após um tempo configurável.
    - Monitorar o estado atual de ocupação.

```typescript
import { Student } from "./student";

export class Hall{
    private readonly capacityByStudent: Student[] = [];
    private occupiedCapacity: number = 0;
    private occupationTime: number;
    private readonly maxHallCapacity: number;

    constructor(maxHallCapacity: number, occupationTime: number){
        this.maxHallCapacity = maxHallCapacity;
        this.occupationTime=occupationTime;
    }

    getMaxHallCapacity(): number {
        return this.maxHallCapacity;
    }

    getOccupiedCapacity(): number {
        return this.occupiedCapacity;
    }

    getCapacityByStudents(): ReadonlyArray<Student> {
        return this.capacityByStudent;
    }

    getOccupationTime():number{
        return this.occupationTime;
    }
    setOccupationTime(timing:number):void{
        if(timing <= 0) throw new Error("O tempo de ocupação deve ser maior que zero");
        this.occupationTime = timing;
    }

    addStudent(student:Student): boolean{
        if(this.occupiedCapacity < this.maxHallCapacity){
            this.occupiedCapacity++;
            this.capacityByStudent.push(student);
            setTimeout(() => this.removeStudent(student), this.occupationTime);
            return true;
        }
        return false;
    }
    removeStudent(student:Student): void{
        const index = this.capacityByStudent.indexOf(student);
        if(index !== -1){
            this.capacityByStudent.splice(index, 1);
            this.occupiedCapacity--;
        }
    }
}
```
### Importação da Classe `Student`.
```typescript
import { Student } from "./student";
```
- Importa a classe `Student` de um módulo (student.ts), necessária para que os estudantes possam ser associados ao salão.

### Declaração da Classe `Hall`.
```typescript
export class Hall {...}
```
- Define a classe `Hall` e a possibilita de ser utilizada em outros módulos através da palavra-chave`export`.
---
### Propriedades da Classe `Hall`.
```typescript
    private readonly capacityByStudent: Student[] = [];
```
- Declara um atributo privado e somente leitura (`readonly`) chamado `capacityByStudent`, que é um array de objetos do tipo `Student`. Este array armazena os estudantes que estão atualmente no salão.
---

```typescript
    private occupiedCapacity: number = 0;
```
- Aqui é declarado um atributo privado chamado `occupiedCapacity`, que é um número inicializado com 0. Este atributo rastreia o número de estudantes atualmente no salão.
---
```typescript
private occupationTime: number;
```
- Atributo privado que marca o tempo em que o estudante permaneceu no salão.
---
```typescript
    private readonly maxHallCapacity: number;
```
- Um atributo privado e somente leitura (`readonly`) chamado `maxHallCapacity`, que é um número que representa a capacidade maxima de estudantes que o salão pode suporta.
---
### Construtor da Classe `Hall`.
```typescript
constructor(maxHallCapacity: number, occupationTime: number){
        this.maxHallCapacity = maxHallCapacity;
        this.occupationTime=occupationTime;
    }
```
--- 
```typescript
    constructor(maxHallCapacity: number, occupationTime: number) {

```
- **Descrição**:

    È definido o construtor da classe `Hall`, que recebe dois parâmetros: `maxHallCapacity` (capacidade máxima da sala) e `occupationTime` (tempo de ocupação da sala).
---
```typescript
    this.maxHallCapacity = maxHallCapacity;
```
- **Descrição**:

     Inicializa o atributo maxHallCapacity com o valor passado como argumento ao construtor.

---

```typescript
    this.occupationTime = occupationTime;
```

- **Descrição**:

    Inicializa o atributo occupationTime com o valor passado como argumento ao construtor.
---
### Métodos da Classe `Hall`.
- `getMaxHallCapacity()`

```typescript
    getMaxHallCapacity(): number {
        return this.maxHallCapacity;
    }
```
 - **Descrição**:
 
    Retorna a capacidade máxima da sala (maxHallCapacity).

---
- `getOccupiedCapacity()`
```typescript
    getOccupiedCapacity(): number {
        return this.occupiedCapacity;
    }
```
- **Descrição**:

    Retorna o número de estudantes atualmente na sala (`occupiedCapacity`).
---
- `getCapacityByStudents()`
```typescript
    getCapacityByStudents(): ReadonlyArray<Student> {
        return this.capacityByStudent;
    }
```
- **Descrição**:
Retorna uma cópia somente leitura (ReadonlyArray) do array capacityByStudent, que contém os estudantes atualmente na sala.
---
- `getOccupationTime()`
```typescript
    getOccupationTime(): number {
        return this.occupationTime;
    }
```
- **Descrição**:

    Retorna o tempo de ocupação da sala (occupationTime).
---
- `setOccupationTime()`
```typescript
    setOccupationTime(timing: number): void {
        if (timing <= 0) throw new Error("O tempo de ocupação deve ser maior que zero");
        this.occupationTime = timing;
    }

```
- **Descrição**:

    Define o tempo de ocupação da sala (occupationTime). Se o valor fornecido for menor ou igual a zero, lança um erro.

---
### Método `addStudent()`.
```typescript
addStudent(student:Student): boolean{
        if(this.occupiedCapacity < this.maxHallCapacity){
            this.occupiedCapacity++;
            this.capacityByStudent.push(student);
            setTimeout(() => this.removeStudent(student), this.occupationTime);
            return true;
        }
        return false;
    }
```
---
```typescript
    addStudent(student: Student): boolean {
```
- **Descrição**:

    Adiciona um estudante à sala, se houver capacidade disponível. Retorna `true` se o estudante foi adicionado com sucesso, caso contrário, retorna `false`.
---

```typescript
        if (this.occupiedCapacity < this.maxHallCapacity) {
```
- **Descrição**:

    Verifica se a capacidade atual da sala (`occupiedCapacity`) é menor que a capacidade máxima (`maxHallCapacity`).
---
```typescript

    this.occupiedCapacity++;
```
- **Descrição**:

    Incrementa o contador de capacidade ocupada (`occupiedCapacity`).
---
```typescript
    this.capacityByStudent.push(student);
```
- **Descrição**:

    Adiciona o estudante ao array capacityByStudent.

---
```typescript
    setTimeout(() => this.removeStudent(student), this.occupationTime);
```
- **Descrição**:

    Configura um temporizador para remover o estudante da sala após o tempo de ocupação (occupationTime) ter decorrido.

---
```typescript
    return true;
```
- **Descrição**:

    Retorna true indicando que o estudante foi adicionado com sucesso.
---
```typescript

        }
        return false;
    }
```
- **Descrição**:

    Retorna false se a sala estiver cheia e o estudante não puder ser adicionado.
---
### Método `toRemoveStudent`.
```typescript
removeStudent(student:Student): void{
        const index = this.capacityByStudent.indexOf(student);
        if(index !== -1){
            this.capacityByStudent.splice(index, 1);
            this.occupiedCapacity--;
        }
    }
}
```
---
```typescript
    removeStudent(student: Student): void {
```
- **Descrição**:

    Remove um estudante da sala.
---

```typescript
    const index = this.capacityByStudent.indexOf(student);
```
- **Descrição**:

    Encontra o índice do estudante no array `capacityByStudent`.
---

```typescript
    if (index !== -1) {
```
- **Descrição**:

    Verifica se o estudante foi encontrado no array (índice diferente de -1).
---

```typescript
    this.capacityByStudent.splice(index, 1);
```
- **Descrição**:

    Remove o estudante do array `capacityByStudent`.
---

```typescript
    this.occupiedCapacity--;
```

- **Descrição**:

    Decrementa o contador de capacidade ocupada (`occupiedCapacity`).
---
```typescript
        }
    }
```

- **Descrição**:

    Finaliza o bloco condicional e o método.
