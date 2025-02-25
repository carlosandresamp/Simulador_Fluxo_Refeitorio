import { Event } from "./event";
import { Observer } from "../simulator/observer";

export class EventMachine {
    private events: Event[] = [];
    private simulationInstant: number = 0;
    private observer: Observer;
    private processedEvents: number = 0;

    constructor(observer: Observer) {
        this.observer = observer;
    }

    public addEvent(event: Event): void {
        // Inserir evento mantendo a ordem cronológica
        const timestamp = event.getTimestamp();
        const index = this.events.findIndex(e => e.getTimestamp() > timestamp);
        if (index === -1) {
            this.events.push(event);
        } else {
            this.events.splice(index, 0, event);
        }
    }

    public processEvents(): void {
        while (this.hasEvents()) {
            const event = this.events.shift();
            if (event) {
                try {
                    const timestamp = event.getTimestamp();
                    if (timestamp < this.simulationInstant) {
                        console.warn(`Evento ignorado: timestamp ${timestamp} menor que instante atual ${this.simulationInstant}`);
                        continue;
                    }
                    this.simulationInstant = timestamp;
                    event.processEvent();
                    this.processedEvents++;
                } catch (error) {
                    console.error(`Erro ao processar evento: ${error}`);
                    break;
                }
            }
        }
    }

    public hasEvents(): boolean {
        return this.events.length > 0;
    }

    public getProcessedEventsCount(): number {
        return this.processedEvents;
    }

    public getObserver(): Observer {
        return this.observer;
    }
}