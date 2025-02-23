export class FromInternalQueueToTheService{
    if (this.internalQueue.length > 0 && this.availableTables > 0) {
        const student = this.internalQueue.shift();
        console.log(`${student} está sendo atendido.`);
        return student || null;
    }
    console.log("Nenhum aluno pode ser atendido agora.");
    return null;
}