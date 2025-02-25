import { Event } from "./event";
import { Observer } from "../simulator/observer";

export class EventMachine {
    private events: Event[] = [];
    private simulationInstant: number = 0;
    private observer: Observer;
    private processedEvents: number = 0;
    private totalEvents: number = 0;

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
        this.totalEvents++;
    }

    public async processEvents(): Promise<void> {
        if (!this.hasEvents()) {
            console.log("\n[Simulação] Não há mais eventos para processar");
            return;
        }

        const currentEvent = this.events.shift();
        if (currentEvent) {
            try {
                const timestamp = currentEvent.getTimestamp();
                if (timestamp < this.simulationInstant) {
                    console.warn(`[${this.formatTime(timestamp)}] Evento ignorado: timestamp anterior ao atual`);
                    return;
                }

                this.simulationInstant = timestamp;
                console.log(`\n[${this.formatTime(timestamp)}] Processando evento...`);
                currentEvent.processEvent();
                this.processedEvents++;

                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`[${this.formatTime(this.simulationInstant)}] Erro ao processar evento:`, error);
            }
        }
    }

    private formatTime(timestamp: number): string {
        const minutes = Math.floor(timestamp / 60);
        const seconds = Math.floor(timestamp % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    public getProgress(): number {
        if (this.totalEvents === 0) return 0;
        return (this.processedEvents / this.totalEvents) * 100;
    }

    public hasEvents(): boolean {
        return this.events.length > 0;
    }

    public getProcessedEventsCount(): number {
        return this.processedEvents;
    }

    public getTotalEventsCount(): number {
        return this.totalEvents;
    }

    public getObserver(): Observer {
        return this.observer;
    }
}