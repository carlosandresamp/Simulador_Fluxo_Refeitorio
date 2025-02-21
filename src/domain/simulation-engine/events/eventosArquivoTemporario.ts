internalQueueToService(): string | null {
    if (this.internalQueue.length > 0 && this.availableTables > 0) {
        const student = this.internalQueue.shift();
        console.log(`${student} está sendo atendido.`);
        return student || null;
    }
    console.log("Nenhum aluno pode ser atendido agora.");
    return null;
}

serviceToTable(student: string) {
    if (this.availableTables > 0) {
        this.availableTables--;
        console.log(`${student} foi para a mesa. Mesas disponíveis: ${this.availableTables}`);
    } else {
        console.log("Nenhuma mesa disponível no momento.");
    }
}