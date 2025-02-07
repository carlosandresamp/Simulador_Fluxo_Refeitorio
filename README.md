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
- #### A classe Student representa um estudante com atributos relacionados ao seu registro, horários de chegada, atendimento e serviço, além do atributo como  status indicando sua situação atual no simulador.

```typescript
export class Student{
    private register: string;
    public comingTime : Date;
    public serviceTime: Date;
    public servedTime: Date;
    public status : string ;

    constructor(register:string, comingTime:Date, serviceTime:Date, servedTime:Date, status:string){
        this.register=register;
        this.comingTime=comingTime;
        this.serviceTime=serviceTime;
        this.servedTime=servedTime;
        this.status=status;
    }

    getregister(){
        return this.register;
    }
    setregister(register:string){
        this.register=register;
        
    }
} 
```
---

- ### Declaração da Classe.

```typescript 
export class Student {}
```
- **export** : Permite que a classe `Student` possa ser utilizada em outros arquivos e modulos.

- **class Student** : Define a classe chamada `Student`.
---
- ### Atibutos da classe `Student`.
```typescript
private register: string;
```
- A propriedade privada `register` do tipo `string` armazena o resgistro ou matricula do estudante.
- `private`:  Define que essa propriedade só podera ser acessada e modificada dentro de sua propria classe.
```typescript
public comingTime: Date;
```

- Propriedade publica `comingTime`, armazena data e hora de chegada do estudante.
- `public`: permite que o atributo possa ser acessado fora de sua propria classe.

```typescript
public serviceTime: Date;
```
- Propriedade que representa o horário de inicio do serviço ao estudante.

```typescript
public servedTime: Date;
```
- Propriedade que armazena data e hora em que o estudante foi servido.

```typescript
public status: string;
```
- Propriedade que indica o status atual do estudante no simulador, como "aguardando", "atendido", etc.

##  Construtor
- O construtor é chamado no momento em que uma nova instância de `Student` é criada.
```typescript
constructor(register: string, comingTime: Date, serviceTime: Date, servedTime: Date, status: string) {
    this.register = register;
    this.comingTime = comingTime;
    this.serviceTime = serviceTime;
    this.servedTime = servedTime;
    this.status = status;
}
```
### Parâmetros:
- Cada parâmetro é atribuído à propriedade correspondente usando `this.<propriedade> = <parâmetro>`

- `register`: Valor para a matricula do estudante.

- ``comingTime``: Valor para o horário de chegada do estudante.

- ``serviceTime``: Valor para o horário de início do serviço.

- `servedTime`: Valor para o horário de atendimento.

- `status`: Valor para o status atual do estudante.

## Métodos da classe `Student`.
#### Método `getregister`
- **Objetivo** : Retorna o valor da propriedade Privada `register`.
- Este metodo permite acessar o registro do estudante de maneira controlada.
``` typescript
getregister() {
    return this.register;
}
```
#### Método `setregister`.
- **Objetivo**: Atualiza o valor da propriedade privada register.
- Permite alterar o registro do estudante de forma controlada.
```typescript
setregister(register: string) {
    this.register = register;
}
```
---
### Classe `ExternalQueue`.
- A principio, a classe `ExternalQueue` representa uma fila externa que gerencia estudantes seguindo o princípio **FIFO (First-In, First-Out)** que significa "primeiro a entrar, primeiro a sair".

```typescript
import { error } from "console";
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";
import { throwDeprecation } from "process";
import { add } from "date-fns";
import { Student } from "./student";

export class ExternalQueue{
    protected studentQuantity:Student[]; 

    constructor(studentQuantity?:Student[]){
        this.studentQuantity = studentQuantity ?? []; 
    }

    protected toAddStudent(student:Student){
        this.studentQuantity.push(student)
        console.log("Novo aluno chegou a fila!");
    }

    protected toRemoveStudent():Student{
        let gettinStudents:Student[] = this.studentQuantity;
        if(gettinStudents || gettinStudents.length == 0){
            throw new Error("Não há alunos na fila");
        }
 
        let studentIndex:Student = this.studentQuantity[0];
        this.studentQuantity.splice(0, 1);
        console.log("Aluno saiu da fila externa.");
        return studentIndex;
    }
}
```
### Imports
- `Student`: Classe que representa um estudante (assumida como definida em `./student`).
- Outras importações como `error`, `SimulationRepositoryMock`, `throwDeprecation`, e `add` não são utilizadas no código atual e podem ser consideradas redundantes.

---
## Detalhes da Classe

### Propriedades
```typescript
protected studentQuantity: Student[];
```
- Armazena a lista de estudantes na fila.
- Inicializada como um array vazio se nenhum valor fornecido no construtor.

## Construtor

```typescript
constructor(studentQuantity?: Student[]) {
    this.studentQuantity = studentQuantity ?? [];
}
```
- Recebe uma lista opcional de estudantes (`studentQuantity`).

- Se nenhum valor for fornecido, inicializa a fila com um array vazio (`?? []`).

## Métodos Protegidos.
- `protected toAddStudent(student: Student)`
```typescript
protected toAddStudent(student: Student) {
  this.studentQuantity.push(student);
  console.log("Novo aluno chegou a fila!");
}
```
- **Funcionalidade**: Esse metodo é responsalve por adicinar um estudante ao final da fila.
- **Comportamento**:  
  - Utiliza `Array.push()` para inserir o estudante a fila.
  - E exibe uma menssagem de log que indicando a chegada do aluno a fila.
---
- `protected toRemoveStudent(): Student{..}`
  - **Propósito**: Define um método protegido para remover um aluno da fila.

  - **Retorno**: Retorna um objeto do tipo ``Student`` (o aluno removido).

  - **Visibilidade**: ``protected`` significa que só pode ser acessado dentro da classe ou em classes filhas.

```typescript
protected toRemoveStudent(): Student {
    let gettinStudents: Student[] = this.studentQuantity;
    if (gettinStudents || gettinStudents.length == 0) {
        throw new Error("Não há alunos na fila");
    }

    let studentIndex: Student = this.studentQuantity[0];
    this.studentQuantity.splice(0, 1);
    console.log("Aluno saiu da fila externa.");
    return studentIndex;
}
```
---
### Copia da lista de alunos
```typescript
let gettinStudents: Student[] = this.studentQuantity;
```

- **Propósito**: Cria uma referencia local(`gettinStudents`) para a lista `studentQuantity` da classe.
### Verificação da fila
```typescript
if (gettinStudents || gettinStudents.length == 0) {
    throw new Error("Não há alunos na fila");
}
```
- Verifica se a fila está vazia antes de remover um aluno na fila.
### Obtenção do Primeiro Aluno
```typescript
let studentIndex: Student = this.studentQuantity[0];
```
- **Propósito**: Recupera o primeiro aluno da fila (índice 0).

### Remoção do Aluno
```typescript
this.studentQuantity.splice(0, 1);
  console.log("Aluno saiu da fila externa.");
```
- **Propósito**: Remove o primeiro elemento do array(`indice 0`).
- **Funcionamento**: 
  - `splice(0, 1)` remove 1 elemento a partir do indice 0.
  - Altera o array original(`studentQuantity`).
  - **log**: indica no console que umaluno foi removido.
```typescript
return studentIndex;
```
- **Propósito**: Retorna o aluno que foi removido da fila.
