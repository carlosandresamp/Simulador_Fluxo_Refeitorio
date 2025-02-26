# Classe `Hall`.
- A classe `Hall` representa o espaço do refeitório onde os estudantes se sentam para fazer suas refeições. Ela gerencia a ocupação das mesas, monitora a capacidade e notifica um observador sobre mudanças na ocupação.

```typescript
import { Student } from "./student";
import { Observer } from "../simulator/observer";

export class Hall {
    private students: Student[];
    private currentOccupancy: number;
    private occupancyTime: number;
    private maxCapacity: number;
    private observer: Observer;

    constructor(maxCapacity: number, observer: Observer) {
        this.students = [];
        this.currentOccupancy = 0;
        this.maxCapacity = maxCapacity;
        this.occupancyTime = 20; // tempo padrão em minutos
        this.observer = observer;
    }

    getMaxHallCapacity(): number {
        return this.maxCapacity;
    }

    getCurrentOccupancy(): number {
        return this.currentOccupancy;
    }

    getStudents(): Student[] {
        return this.students.slice();
    }

    getOccupationTime(): number {
        return this.occupancyTime;
    }

    setOccupationTime(timing: number): void {
        if (timing <= 0) throw new Error("O tempo de ocupação deve ser maior que zero");
        this.occupancyTime = timing;
    }

    addStudent(student: Student, timestamp: number): boolean {
        if (this.currentOccupancy < this.maxCapacity) {
            this.currentOccupancy++;
            this.students.push(student);
            setTimeout(() => this.removeStudent(student, timestamp), this.occupancyTime);
            this.observer.notifyOccupancyChange(this.currentOccupancy);
            return true;
        }
        return false;
    }

    removeStudent(student: Student, timestamp: number): void {
        const index = this.students.indexOf(student);
        if (index !== -1) {
            this.students.splice(index, 1);
            this.currentOccupancy--;
            this.observer.notifyOccupancyChange(this.currentOccupancy);
        }
    }

    setMaxHallCapacity(maxCapacity: number): void {
        if (maxCapacity > 0) {
            this.maxCapacity = maxCapacity;
        }
    }

    hasAvailableTables(): boolean {
        return this.currentOccupancy < this.maxCapacity;
    }
}
```

### Importações
```typescript
import { Student } from "./student";
import { Observer } from "../simulator/observer";
```
- **Descrição**:
    - `Student`: Classe que representa um estudante
    - `Observer`: Interface para notificação de mudanças na ocupação do refeitório

### Propriedades da Classe
```typescript
    private students: Student[];
    private currentOccupancy: number;
    private occupancyTime: number;
    private maxCapacity: number;
    private observer: Observer;
```
- **Descrição**:
    - `students`: Array que armazena os estudantes atualmente no refeitório
    - `currentOccupancy`: Número atual de lugares ocupados
    - `occupancyTime`: Tempo padrão de ocupação (em minutos)
    - `maxCapacity`: Capacidade máxima de lugares
    - `observer`: Observador que monitora mudanças na ocupação

### Construtor
```typescript
    constructor(maxCapacity: number, observer: Observer) {
        this.students = [];
        this.currentOccupancy = 0;
        this.maxCapacity = maxCapacity;
        this.occupancyTime = 20; // tempo padrão em minutos
        this.observer = observer;
    }
```
- **Descrição**:
    - Inicializa um novo refeitório com capacidade máxima definida
    - Configura o observador para monitoramento
    - Define tempo padrão de ocupação como 20 minutos
    - Inicializa arrays e contadores

### Métodos de Gerenciamento de Estudantes
```typescript
    addStudent(student: Student, timestamp: number): boolean
    removeStudent(student: Student, timestamp: number): void
```
- **Descrição**:
    - `addStudent`: 
        - Adiciona um estudante ao refeitório se houver lugar disponível
        - Atualiza o status do estudante para "EATING"
        - Notifica o observador sobre a mudança na ocupação
        - Retorna `true` se adicionado com sucesso, `false` caso contrário
    
    - `removeStudent`:
        - Remove um estudante do refeitório
        - Atualiza a ocupação atual
        - Notifica o observador sobre a mudança

### Métodos de Configuração e Consulta
```typescript
    setMaxHallCapacity(maxCapacity: number): void
    getCurrentOccupancy(): number
    hasAvailableTables(): boolean
    getStudents(): Student[]
```
- **Descrição**:
    - `setMaxHallCapacity`: 
        - Define nova capacidade máxima
        - Valida se o valor é positivo
    
    - `getCurrentOccupancy`:
        - Retorna o número atual de lugares ocupados
    
    - `hasAvailableTables`:
        - Verifica se há mesas disponíveis
        - Retorna `true` se houver lugares livres
    
    - `getStudents`:
        - Retorna uma cópia do array de estudantes
        - Evita modificação direta do array interno
