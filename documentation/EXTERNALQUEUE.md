# Classe `ExternalQueue`
- A classe ExternalQueue representa a fila externa do refeitório, onde os estudantes aguardam para acessar a catraca.

```typescript
import { Student } from "./student";

export class ExternalQueue {
    protected students: Student[];
}
```

## Propriedades
```typescript
    protected students: Student[];
```
- **Descrição**:
    - `students`: Array de estudantes na fila externa
    - Protegido para permitir herança pela fila interna

## Construtor
```typescript
constructor(students?: Student[]) {
    this.students = students ?? [];
}
```
- **Descrição**:
    - Inicializa fila vazia ou com estudantes fornecidos
    - Usa operador de coalescência nula para inicialização segura

## Métodos

### Métodos de Gerenciamento
```typescript
addStudent(student: Student): void
removeStudent(): Student | null
```
- **Descrição**:
    - `addStudent`: Adiciona estudante ao final da fila
    - `removeStudent`: Remove e retorna primeiro estudante da fila

### Métodos de Consulta
```typescript
isEmpty(): boolean
getLength(): number
getStudents(): Student[]
```
- **Descrição**:
    - `isEmpty`: Verifica se fila está vazia
    - `getLength`: Retorna quantidade de estudantes
    - `getStudents`: Retorna cópia do array de estudantes

## Importações e Dependências
```typescript
import { Student } from "./student";
```
- **Descrição Detalhada**:
    - Importa a classe `Student` que contém todas as informações e comportamentos relacionados aos estudantes
    - A dependência é essencial para manipular os dados dos estudantes na fila, como matrícula e status

## Estrutura da Classe

### Propriedades
```typescript
protected students: Student[];
```
- **Descrição Detalhada**:
    - `students`: Array protegido que mantém a ordem dos estudantes na fila
    - O modificador `protected` permite que classes derivadas acessem e modifiquem a fila
    - A estrutura de array garante a ordem FIFO natural dos elementos
    - Cada elemento é uma instância da classe `Student`

### Construtor
```typescript
constructor(students?: Student[]) {
    this.students = students ?? [];
}
```
- **Descrição Detalhada**:
    - Inicializa uma nova instância da fila externa
    - O parâmetro opcional `students` permite criar uma fila já com estudantes
    - O operador `??` garante a inicialização segura mesmo sem parâmetros
    - Uso: 
        ```typescript
        // Criar fila vazia
        const emptyQueue = new ExternalQueue();
        
        // Criar fila com estudantes existentes
        const prefilledQueue = new ExternalQueue([student1, student2]);
        ```

## Métodos de Gerenciamento

### Adição de Estudantes
```typescript
addStudent(student: Student): void {
    this.students.push(student);
    console.log(`Estudante ${student.getRegistration()} entrou na fila externa`);
}
```
- **Descrição Detalhada**:
    - Adiciona um novo estudante ao final da fila
    - Mantém o princípio FIFO da estrutura
    - Registra a operação com o número de matrícula para rastreamento
    - Uso:
        ```typescript
        queue.addStudent(new Student("2024001"));
        // Output: "Estudante 2024001 entrou na fila externa"
        ```

### Remoção de Estudantes
```typescript
removeStudent(): Student | null {
    if (this.isEmpty()) {
        console.log("Fila Externa Vazia: Não é possível remover estudantes.");
        return null;
    }

    const student = this.students.shift()!;
    console.log(`Estudante ${student.getRegistration()} saiu da fila externa`);
    return student;
}
```
- **Descrição Detalhada**:
    - Remove e retorna o primeiro estudante da fila (princípio FIFO)
    - Implementa verificação de fila vazia para evitar erros
    - Retorna `null` em caso de fila vazia, permitindo tratamento seguro
    - Registra a operação para fins de auditoria
    - Uso:
        ```typescript
        const student = queue.removeStudent();
        if (student) {
            // Processa o estudante removido
        } else {
            // Trata o caso de fila vazia
        }
        ```

## Métodos de Consulta e Utilidade

### Verificação de Estado
```typescript
isEmpty(): boolean {
    return this.students.length === 0;
}
```
- **Descrição Detalhada**:
    - Verifica se a fila está vazia
    - Método útil para validações e controle de fluxo
    - Retorna `true` se não houver estudantes na fila
    - Uso:
        ```typescript
        if (queue.isEmpty()) {
            console.log("Nenhum estudante aguardando");
        }
        ```

### Consulta de Tamanho
```typescript
getLength(): number {
    return this.students.length;
}
```
- **Descrição Detalhada**:
    - Retorna o número atual de estudantes na fila
    - Útil para monitoramento e controle de capacidade
    - Uso:
        ```typescript
        const studentsWaiting = queue.getLength();
        console.log(`${studentsWaiting} estudantes na fila`);
        ```

### Acesso aos Estudantes
```typescript
getStudents(): Student[] {
    return [...this.students];
}
```
- **Descrição Detalhada**:
    - Retorna uma cópia segura do array de estudantes
    - Implementa o padrão de cópia defensiva para proteger os dados internos
    - Evita modificações acidentais da fila original
    - Uso:
        ```typescript
        const currentStudents = queue.getStudents();
        // Pode manipular currentStudents sem afetar a fila original
        ```

## Boas Práticas e Considerações
1. **Encapsulamento**: A classe mantém seus dados protegidos, expondo apenas métodos necessários
2. **Imutabilidade**: Implementa cópia defensiva para prevenir modificações indevidas
3. **Logging**: Mantém registro de operações importantes para debugging e auditoria
4. **Tratamento de Erros**: Implementa verificações de estado e retorna valores apropriados
5. **Extensibilidade**: Permite herança através do modificador `protected`
