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