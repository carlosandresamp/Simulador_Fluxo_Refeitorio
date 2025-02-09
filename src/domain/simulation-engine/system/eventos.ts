class Refeitorio {
    // Define a classe 'Refeitorio' para gerenciar o fluxo de alunos no refeitório.
    private externalQueue: number = 0; // Armazena a quantidade de alunos na fila externa.
    private internalQueue: number = 0; // Armazena a quantidade de alunos na fila interna.
    private occupiedTables: number = 0; // Armazena a quantidade de mesas ocupadas.
    private tableCapacity: number; // Define a capacidade total de mesas disponíveis.
    private attendanceBlocked: boolean = false; // Indica se o atendimento está bloqueado.
    private turnstileBlocked: boolean = false; // Indica se a catraca está bloqueada.
    
    constructor(tableCapacity: number) {
        this.tableCapacity = tableCapacity; // Inicializa a classe com a capacidade de mesas definida.
    }
    
    studentArrivalExternalQueue() {
        this.externalQueue++; // Gerencia a chegada de um aluno na fila externa
        if (!this.turnstileBlocked) {
            this.passThroughTurnstile(); // Verifica se pode passar pela catraca
        }
    }
    
    passThroughTurnstile() {
        if (this.internalQueue < this.tableCapacity) {
            this.externalQueue--;
            this.internalQueue++; // Move um aluno da fila externa para a interna se houver espaço
        } else {
            this.blockTurnstile(); // Bloqueia a catraca caso a fila interna esteja cheia
        }
    }
    
    blockTurnstile() {
        this.turnstileBlocked = true; // Bloqueia a catraca
    }
    
    unblockTurnstile() {
        if (this.internalQueue < this.tableCapacity) {
            this.turnstileBlocked = false; // Desbloqueia a catraca se houver espaço na fila interna
        }
    }
    
    studentArrivalInternalQueue() {
        if (!this.attendanceBlocked) {
            this.attendStudent(); // Gerencia a chegada de um aluno na fila interna e inicia o atendimento se possível
        }
    }
    
    attendStudent() {
        if (this.occupiedTables < this.tableCapacity) {
            this.occupiedTables++; // Atende um aluno e ocupa uma mesa se houver disponibilidade
        } else {
            this.blockAttendance(); // Bloqueia o atendimento se todas as mesas estiverem ocupadas
        }
    }
    
    blockAttendance() {
        this.attendanceBlocked = true; // Bloqueia o atendimento
    }
}