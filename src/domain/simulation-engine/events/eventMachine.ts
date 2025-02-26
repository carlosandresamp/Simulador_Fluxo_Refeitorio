import { Event } from "./event";
import { Observer } from "../simulator/observer";

export class EventMachine {
    private events: Event[] = [];
    private simulationTime: number = 0;
    private observer: Observer;
    private processedEvents: number = 0;
    private totalEvents: number = 0;

    constructor(observer: Observer) {
        this.observer = observer;
    }

    public addEvent(event: Event): void {
        const timestamp = event.getTimestamp();
        const index = this.events.findIndex(e => e.getTimestamp() > timestamp);
        
        if (index === -1) {
            this.events.push(event);
        } else {
            this.events.splice(index, 0, event);
        }
        this.totalEvents++;
    }

    public processEvents(): void {
        while (this.events.length > 0) {
            const currentEvent = this.events.shift();
            if (!currentEvent) break;
    
            console.log(`\n[${currentEvent.getTimestamp().toFixed(2)}s] Processando evento...`);
            
            try {
                currentEvent.processEvent();
                this.processedEvents++;
            } catch (error) {
                console.log(`[ERRO] Erro ao processar evento: ${error.message}`);
            }
        }
    
     
    
        
        console.log(`\n[INFO] Simulação finalizada. Eventos processados: ${this.processedEvents}`);
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