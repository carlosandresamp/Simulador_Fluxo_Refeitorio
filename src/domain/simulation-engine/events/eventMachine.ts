import { Event} from "./event";
import { Observer } from "../simulator/observer";

export class EventMachine{
    private events : Event[] = [];
    private simulationInstant: number = 0;
    private observer:Observer = new Observer();

    public processEvents():void {
        while(this.events.length>0){
        this.events = this.events.sort((event1,event2)=>event1.getTimestamp()-event2.getTimestamp());
        const event = this.events.shift()!; 
        event.processEvent(); 
        this.updateSimulationIntant(event.getTimestamp());  
    }
    }
    public addEvent(event:Event){
        this.events.push(event);
    }

    public getObserver():Observer{
        return this.observer;
    }

    private updateSimulationIntant(newInstant:number){
       if(newInstant<this.simulationInstant) {
            throw new Error('Você não pode voltar no tempo.');
       }
       this.simulationInstant = newInstant;
    }
}