export class FromServiceToTheTable{
    if (this.availableTables > 0) {
        this.availableTables--;
        console.log(`${student} foi para a mesa. Mesas disponíveis: ${this.availableTables}`);
    } else {
        console.log("Nenhuma mesa disponível no momento.");
    }
}

