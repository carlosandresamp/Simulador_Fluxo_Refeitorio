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

