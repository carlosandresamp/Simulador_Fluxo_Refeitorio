# Simulador_Fluxo_Refeitorio
 Sistema de simulação que modela o fluxo de alunos em um refeitório universitário, permitindo a configuração de parâmetros operacionais e a análise estatística dos resultados para entender gargalos, eficiência e tempo médio de atendimento.

# Descrição Detalhada do Funcionamento do Refeitório

O refeitório opera em etapas sequenciais, com regras de controle de fluxo e limites físicos:

## 1. Fila Externa
- **Capacidade**: Sem limite de capacidade.
- **Objetivo**: Alunos aguardam para acessar a catraca.
- **Controle de Entrada**: A entrada na fila externa é determinada por uma distribuição configurável (normal, logarítmica ou linear) dentro do intervalo **IAR**.

## 2. Catraca
- **Função**: Controla o acesso à fila interna.
- **Operação**:
  - Cada aluno digita sua matrícula, levando em média **TMDM** segundos.
  - Bloqueia a entrada se a fila interna atingir o limite máximo **LFI**.
  - Libera novamente quando a fila interna reduz **QAL** alunos.

## 3. Fila Interna
- **Capacidade**: Máxima definida por **LFI**.
- **Objetivo**: Alunos aguardam para serem atendidos pelos funcionários.
- **Controle**:
  - Se todas as mesas estiverem ocupadas (**LM**), o atendimento é pausado até que uma mesa seja liberada.

## 4. Atendimento (Funcionários)
- **Função**: Servir comida aos alunos.
- **Operação**:
  - Servem a comida em um tempo médio de **TMPSC** segundos por aluno.
  - Atendimento ocorre apenas se houver mesas disponíveis.

## 5. Mesas
- **Capacidade**: Máxima definida por **LM**.
- **Operação**:
  - Cada aluno ocupa uma mesa por **TMPNM** segundos.
  - Após esse tempo, a mesa é liberada automaticamente.

## 6. Classes

- ### Class Student
- #### Este código implementa uma classe ``Student``, que representa um estudante e gerencia seu status durante um processo de atendimento. O status do estudante pode ser "``aguardando``", "``atendido``" ou "``saindo``". Abaixo, detalhamos cada parte do código.

```typescript
export type StudentStatus = "aguardando" | "atendido" | "saindo";

export class Student{
    private register: string;
    public readonly comingTime : Date;
    public readonly serviceTime: Date;
    public readonly servedTime: Date;
    public status : StudentStatus;

    constructor(register:string, comingTime:Date, serviceTime:Date, servedTime:Date, status:StudentStatus){
        this.register=register;
        this.comingTime=comingTime;
        this.serviceTime=serviceTime;
        this.servedTime=servedTime;
        this.status=status;
    }

    getRegister(){
        return this.register;
    }

    setRegister(newRegister:string){
        return this.register=newRegister;
    }

    getStatus(){
        return this.status;
    }
    setStatus(newStatus: StudentStatus):void{
        if(!["aguardando", "atendido", "saindo"].includes(newStatus)){
            throw new Error(`Status Inválido: ${newStatus}`);
        }
        this.status = newStatus;
    }

} 
```
---

- ### Definição do Tipo `StudentStatus`.
- **Explicação**:

    O tipo `StudentStatus` é um tipo de união (`union type`) que define os possíveis estados de um estudante durante o atendimento. Ele pode assumir um dos seguintes valores:

    - "`aguardando`": O estudante está aguardando para ser atendido.
    - "`atendido`": O estudante foi atendido.
    - "``saindo``": O estudante está saindo após o atendimento.

- **Utilizaçaõ**:
    - Esse tipo é utilizado para garantir que o status do estudante seja sempre um dos valores válidos, evitando erros de atribuição.
### Definição da Classe Student.
- A classe ``Student`` representa um estudante e contém informações sobre seu registro, horários e status.

### Propriedades da Classe `Student`:

```typescript 
export class Student {
    private register: string;
    public readonly comingTime: Date;
    public readonly serviceTime: Date;
    public readonly servedTime: Date;
    public status: StudentStatus;
}
```
- **Propriedades**:
    - ``register`` (privado): Armazena o número de registro do estudante ou matricula. É uma propriedade privada, o que significa que só pode ser acessada ou modificada dentro da propria classe.

    - `comingTime` (público e somente leitura): Armazena o horário em que o estudante chegou para o atendimento. É `readonly`, ou seja, não pode ser alterado após a criação do objeto.

    - `serviceTime` (público e apenas leitura): Armazena o horário em que o estudante iniciou o atendimento. Também é `readonly`.

    - `servedTime` (público e apenas leitura): Armazena o horário em que o estudante foi atendido. Também é `readonly`.

    - `status` (público): Armazena o status atual do estudante, que deve ser um dos valores definidos pelo tipo `StudentStatus`.
---
### Construtor da Classe `Student`
```typescript
constructor(register: string, comingTime: Date, serviceTime: Date, servedTime: Date, status: StudentStatus) {
    this.register = register;
    this.comingTime = comingTime;
    this.serviceTime = serviceTime;
    this.servedTime = servedTime;
    this.status = status;
}
```
- **Descrição**: 
    
    O construtor da classe `Student` é responsável por inicializar as propriedades do objeto. Ele recebe os seguintes parâmetros:
    - `register`: O número de registro do estudante.

    - `comingTime`: O horário de chegada do estudante.

    - `serviceTime`: O horário em que o estudante iniciou o atendimento.

    - `servedTime`: O horário em que o estudante foi.

    - `status`: O status inicial do estudante.
- **Utilização**:

    Ao criar uma instância da classe `Student`, é necessário fornecer todos os parâmetros para inicializar o objeto corretamente.

### Métodos da Classe `Student`: 

- Método `getRegister`:
```typescript
getRegister() {
    return this.register;
}
```
- **Descrição**: 

    Retorna o número de registro do estudante.

- **Utilização**:

    Permite acessar o valor da propriedade privada `register` de fora da classe.
---

- Método `setRegister`:
```typescript
setRegister(newRegister: string) {
    return this.register = newRegister;
}
```
- **Descrição**: 

    Atualiza o número de registro do estudante.

- **Utilização**:

    Permite modificar o valor da propriedade privada `register` de fora da classe.
---  

- Método `getStatus`:
```typescript
getStatus() {
    return this.status;
}
```
- **Descrição**: 

    Retorna o status atual do estudante.


- **Utilização**:

    Permite acessar o valor da propriedade `status` de fora da classe.
---
- Método `setStatus`;
```Typescript
setStatus(newStatus: StudentStatus): void {
    if (!["aguardando", "atendido", "saindo"].includes(newStatus)) {
        throw new Error(`Status Inválido: ${newStatus}`);
    }
    this.status = newStatus;
}
```
- **Descrição**:

    Atualiza o status do estudante. Antes de atribuir o novo valor, o método verifica se o status fornecido é válido (ou seja, se é um dos valores permitidos pelo tipo `StudentStatus`). Caso não seja, lança um erro.

- **Utilização**:

    Permite modificar o valor da propriedade `status` de fora da classe, garantindo que apenas valores válidos sejam atribuídos.
---

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

---
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

---
# Classe `Service`:
-  A classe Service representa o atendimento de um funcionário, com foco no serviço de servir comida dentro do refeitório. Ela possui informações sobre o funcionário e simula o ato de servir comida. Logo abaixo, detalhamos cada parte do código.
```typescript
export class Service {
    coWorkerRegister: string; 
    coWorkerName: string; 
    middleTimeService: number; 

    constructor(coWorkerRegister: string, coWorkerName: string, middleTimeService: number) {
        this.coWorkerRegister = coWorkerRegister; 
        this.coWorkerName = coWorkerName; 
        this.middleTimeService = middleTimeService; 
    }

    serveFood(): void {
        console.log(`Funcionário ${this.coWorkerName} está servindo a comida.`);
    }
}
```

## Definição da Classe `Service:`
```typescript
export class Service {}
```
- **Descrição**:

    Utilizando `export` a classe `Service` pode ser exportada e utilizada em outros módulos.

### Propriedades da Classe `Service`.
```Typescript
    coWorkerRegister: string;
    coWorkerName: string; 
    middleTimeService: number; 
```
- **Propriedades**:
    - `coWorkerRegister: string;` : Armazena o identificador único do funcionário responsável pelo atendimento ao aluno.

    - `coWorkerName: string;`: Armazena o nome do funcionário responsavel pelo atendimento.

    -  `middleTimeService: number;`: Armazena o tempo médio, em minutos, que o funcionário leva para servir a comida.

### Construtor da Classe `Service`:
```typescript
 constructor(coWorkerRegister: string, coWorkerName: string, middleTimeService: number) {
        this.coWorkerRegister = coWorkerRegister; 
        this.coWorkerName = coWorkerName; 
        this.middleTimeService = middleTimeService; 
    }
```
- **Descrição**:

    O construtor da classe Service é responsável por inicializar as propriedades do objeto. Ele recebe três parâmetros:
    - `coWorkerRegister`: O identificador único do funcionário.

    - `coWorkerName`: O nome do funcionário.

    - `middleTimeService`: O tempo médio, em minutos, que o funcionário leva para servir a comida.
- **Funcionamento**:
    - `this.coWorkerRegister = coWorkerRegister`: Atribui o valor do parâmetro `coWorkerRegister` à propriedade `coWorkerRegister` da classe.`

    - `this.coWorkerName = coWorkerName`: Atribui o valor do parâmetro `coWorkerName` à propriedade `coWorkerName` da classe. 

    - `this.middleTimeService = middleTimeService`: Atribui o valor do parâmetro `middleTimeService` à propriedade `middleTimeService` da classe.

## Métodos da Classe `Service`.
- Método `servedFood()`
```typescript
serveFood(): void {
        console.log(`Funcionário ${this.coWorkerName} está servindo a comida.`);
}
```
- **Descrição**:

    - O método `serveFood` simula o ato de servir comida por um funcionário. Ele exibe uma mensagem no console informando que o funcionário está servindo a comida.
- **Funcionamento**: 
    - `console.log(Funcionário ${this.coWorkerName} está servindo a comida.)`: Exibe uma mensagem no console, utilizando o nome do funcionário armazenado na propriedade `coWorkerName`.

---
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

---
# Classe `SimulationRepositoryMock`
- A classe `SimulationRepositoryMock` é responsável por simular operações de persistência de dados de simulações utilizando o `localStorage` do navegador.
```typescript
import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";
import { SmileIcon } from "lucide-react";
import { resolve } from "path";

export class SimulationRepositoryMock implements SimulationRepositoryI {
  private localeStorageKey:string = "simulation";

  async save(simulation: Simulation): Promise<void> {
    if (!simulation.id) {
      simulation.id = "mock-id" + Date.now();
    }

    let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
    let listSimulationsFounded: boolean = false;

    for (let i = 0; i < gettinSimulations.length; i++) {
      if (gettinSimulations[i].id === simulation.id) {
        gettinSimulations[i] = simulation;
        listSimulationsFounded = true;
        break; 
      }
    }

    if (!listSimulationsFounded) {
      gettinSimulations.push(simulation);
      console.log("Simulação salva com sucesso");
    }

    this.savingLocaleStorage(gettinSimulations);
    return Promise.resolve();

  }

  async getById(id: string): Promise<Simulation | null> {
    
    let gettingSimulations:Simulation[] = this.getAllFromLocaleStorage();
    let searchingSimulationById:number = gettingSimulations.findIndex(Simulation => Simulation.id == id)
    let indexFound:number = searchingSimulationById;

    if(indexFound != -1){
      return gettingSimulations[indexFound];
    }else{
      return null;
    }
  }

  async getAll(): Promise<Simulation[]> {
    let gettinSimulations:Simulation[] = this.getAllFromLocaleStorage();
    
    return Promise.resolve(gettinSimulations);
  }

  async delete(id: string): Promise<void> {
    let dataBaseSimulations:Simulation[] = this.getAllFromLocaleStorage();
    let thereIsSimulation:boolean = false;

    for(let i=0; i<dataBaseSimulations.length; i++){
      if(dataBaseSimulations[i].id == id){
        dataBaseSimulations[i].id = id;
        thereIsSimulation = true;
        dataBaseSimulations.splice(i, 1);

        this.savingLocaleStorage(dataBaseSimulations);
        console.log("Simulação excluída com sucesso");
        break;
      }
    }

    return Promise.resolve();
  }

  _getCallLog(): string[] {
    return [];
  }

  private savingLocaleStorage(simulation:Simulation[]){
    let savingData:string = JSON.stringify(simulation);
    localStorage.setItem(this.localeStorageKey, savingData);
  }
  
  private getAllFromLocaleStorage():Simulation[]{
    const listSimulations = localStorage.getItem(this.localeStorageKey);
    if(listSimulations != null){
      return JSON.parse(listSimulations);
    }else{
      return [];
    }
  }
}
```
---
### Imports da Classe `SimulationRepositoryMock`

```typescript
import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
import { SimulationParameters } from "./Entities/simulation-parameters";
import { SmileIcon } from "lucide-react";
import { resolve } from "path";
```
- `SimulationRepositoryI`: Interface que define os métodos que a classe `SimulationRepositoryMock` deve implementar.

- `Simulation`: Entidade que representa uma simulação.

- `SimulationParameters`: Entidade que representa os parâmetros de uma simulação.

- `SmileIcon`: Ícone da biblioteca `lucide-react` (não utilizado no código).

- `resolve`: Função do módulo `path` para resolver caminhos de arquivos (não utilizado no código).

## Classe `SimulationRepositoryMock`

```typescript
export class SimulationRepositoryMock implements SimulationRepositoryI {
```
- A classe SimulationRepositoryMock implementa a interface SimulationRepositoryI, simulando um repositório de simulações.

### Atributos
```typescript
private localeStorageKey: string = "simulation";
```
- `localeStorageKey`: Chave utilizada para armazenar e recuperar as simulações no `localStorage`.

## Métodos da classe `SimulationRepositoryMock`.

### Método `save`
```typescript
async save(simulation: Simulation): Promise<void> {
    if (!simulation.id) {
      simulation.id = "mock-id" + Date.now();
    }

    let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
    let listSimulationsFounded: boolean = false;

    for (let i = 0; i < gettinSimulations.length; i++) {
      if (gettinSimulations[i].id === simulation.id) {
        gettinSimulations[i] = simulation;
        listSimulationsFounded = true;
        break; 
      }
    }

    if (!listSimulationsFounded) {
      gettinSimulations.push(simulation);
      console.log("Simulação salva com sucesso");
    }

    this.savingLocaleStorage(gettinSimulations);
    return Promise.resolve();

  }
```
---
```typescript
async save(simulation: Simulation): Promise<void> {
```
- Salva uma simulação no `localStorage`. Se a simulação não tiver um `id`, um `id` mock é gerado.
---

```typescript
if (!simulation.id) {
  simulation.id = "mock-id" + Date.now();
}
```
- `simulation.id`: Se a simulação não tiver um `id`, um `id` mock é gerado usando o timestamp atual.
---

```typescript
let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
let listSimulationsFounded: boolean = false;
```
- `gettinSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `listSimulationsFounded`: Flag para indicar se a simulação já existe na lista.

---

```typescript
for (let i = 0; i < gettinSimulations.length; i++) {
  if (gettinSimulations[i].id === simulation.id) {
    gettinSimulations[i] = simulation;
    listSimulationsFounded = true;
    break;
  }
}
```
- **Loop `for`**: Itera sobre as simulações existentes para verificar se a simulação atual já existe.

- `break`: Sai do loop após encontrar a simulação.
---

```typescript
if (!listSimulationsFounded) {
  gettinSimulations.push(simulation);
  console.log("Simulação salva com sucesso");
}
```
- `if`: Se a simulação não foi encontrada na lista, ela é adicionada.

---

```typescript
this.savingLocaleStorage(gettinSimulations);
return Promise.resolve();
```
- `savingLocaleStorage`: Salva a lista atualizada de simulações no localStorage.

- `Promise.resolve()`: Retorna uma promessa resolvida.
---

### Método `getById`

```typescript
async getById(id: string): Promise<Simulation | null> {
    
    let gettingSimulations:Simulation[] = this.getAllFromLocaleStorage();
    let searchingSimulationById:number = gettingSimulations.findIndex(Simulation => Simulation.id == id)
    let indexFound:number = searchingSimulationById;

    if(indexFound != -1){
      return gettingSimulations[indexFound];
    }else{
      return null;
    }
  }
```
---

```typescript
async getById(id: string): Promise<Simulation | null> {
```
- Recupera uma simulação pelo `id`.
---

```typescript
let gettingSimulations: Simulation[] = this.getAllFromLocaleStorage();
let searchingSimulationById: number = gettingSimulations.findIndex(Simulation => Simulation.id == id);
let indexFound: number = searchingSimulationById;
```
- `gettingSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `searchingSimulationById`: Encontra o índice da simulação com o `id` especificado.

- `indexFound`: Armazena o índice encontrado.
---

```typescript
if (indexFound != -1) {
  return gettingSimulations[indexFound];
} else {
  return null;
}
```
- `if`: Se a simulação for encontrada, retorna a simulação. Caso contrário, retorna null.
---

### Método `getAll`
```typescript
async getAll(): Promise<Simulation[]> {
    let gettinSimulations:Simulation[] = this.getAllFromLocaleStorage();
    
    return Promise.resolve(gettinSimulations);
  }
```
---
```typescript
async getAll(): Promise<Simulation[]> {
```
- Recupera todas as simulações armazenadas no `localStorage`.

---

```typescript
let gettinSimulations: Simulation[] = this.getAllFromLocaleStorage();
return Promise.resolve(gettinSimulations);
```
- `gettinSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `Promise.resolve`: Retorna uma promessa resolvida com a lista de simulações.
---


### Método `delete`
```typescript
 async delete(id: string): Promise<void> {
    let dataBaseSimulations:Simulation[] = this.getAllFromLocaleStorage();
    let thereIsSimulation:boolean = false;

    for(let i=0; i<dataBaseSimulations.length; i++){
      if(dataBaseSimulations[i].id == id){
        dataBaseSimulations[i].id = id;
        thereIsSimulation = true;
        dataBaseSimulations.splice(i, 1);

        this.savingLocaleStorage(dataBaseSimulations);
        console.log("Simulação excluída com sucesso");
        break;
      }
    }

    return Promise.resolve();
  }
```
---
```typescript
async delete(id: string): Promise<void> {
```
- Remove uma simulação pelo `id`.
---

```typescript
let dataBaseSimulations: Simulation[] = this.getAllFromLocaleStorage();
let thereIsSimulation: boolean = false;
```
- `dataBaseSimulations`: Recupera todas as simulações armazenadas no `localStorage`.

- `thereIsSimulation`: Flag para indicar se a simulação foi encontrada.
---

```typescript
for (let i = 0; i < dataBaseSimulations.length; i++) {
  if (dataBaseSimulations[i].id == id) {
    dataBaseSimulations[i].id = id;
    thereIsSimulation = true;
    dataBaseSimulations.splice(i, 1);

    this.savingLocaleStorage(dataBaseSimulations);
    console.log("Simulação excluída com sucesso");
    break;
  }
}
```
- **Loop `for`**: Itera sobre as simulações existentes para encontrar e remover a simulação com o id especificado.

- `splice`: Remove a simulação da lista.

- `savingLocaleStorage`: Salva a lista atualizada de simulações no `localStorage`.

- `break`: Sai do loop após encontrar a simulação.
---

```typescript
return Promise.resolve();
```
- `Promise.resolve()`: Retorna uma promessa resolvida.
---

### Método `_getCallLog`
```typescript
_getCallLog(): string[] {
  return [];
}
```
- `_getCallLog`: Método opcional para verificar se as funções foram chamadas. Retorna um array vazio.
---
### Métodos de auxilio

```typescript
private savingLocaleStorage(simulation: Simulation[]) {
  let savingData: string = JSON.stringify(simulation);
  localStorage.setItem(this.localeStorageKey, savingData);
}
```
- `savingLocaleStorage`: Converte a lista de simulações em uma string JSON e a salva no `localStorage`.
---
```typescript
private getAllFromLocaleStorage(): Simulation[] {
  const listSimulations = localStorage.getItem(this.localeStorageKey);
  if (listSimulations != null) {
    return JSON.parse(listSimulations);
  } else {
    return [];
  }
}
```
- `getAllFromLocaleStorage`: Recupera a lista de simulações do `localStorage` e a converte de volta para um array de objetos `Simulation`. Se não houver dados, retorna um array vazio.