import { Student } from "../system/student";
import { Event } from "./event";
import { EventMachine } from "./eventMachine";
import { Cafeteria } from "../system/cafeteria";
import { GetOutFromExternalQueueToTheTurnstile } from "./getOutFromExternalQueueToTheTurnstile";
import { RandomGeneratorI } from "../util/random-generators"; // Importa a interface das distribuições

export class StudentArrivingToTheExternalQueue extends Event {
    private student: Student;
    private randomGenerator: RandomGeneratorI; // Adiciona o gerador aleatório

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student, randomGenerator: RandomGeneratorI) {
        super(timestamp, cafeteria, machine);
        this.student = student;
        this.randomGenerator = randomGenerator; // Inicializa com o gerador selecionado
    }

    processEvent(): void {
        console.log(`Event - StudentArrival - ${this.timestamp}`);

        // Tentativa de adicionar o aluno à fila externa
        const queueWasEmpty = this.cafeteria.getExternalQueue().emptyExternalQueue();
        const success = this.cafeteria.studentArrival(this.student);
         if (!success) {
            throw new Error("Erro ao adicionar aluno na fila externa.");
        }

        if (success && queueWasEmpty) {
            const scheduling1 = new GetOutFromExternalQueueToTheTurnstile(this.timestamp, this.cafeteria, this.machine);
         // Verifica se o evento foi criado com sucesso
         if (!scheduling1) {
            throw new Error("Erro ao criar o evento de saída da fila externa para a catraca.");
    }
            this.machine.addEvent(scheduling1);
        }


           // Cria um novo evento para a chegada do próximo aluno
           const newStudent = new Student(this.student.servedTime, this.student.getMiddleTypingTime());
           const newEvent = new StudentArrivingToTheExternalQueue(this.timestamp, this.cafeteria, this.machine, newStudent, this.randomGenerator);
           this.machine.addEvent(newEvent);
    }
}
