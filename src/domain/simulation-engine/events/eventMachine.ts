import { Event} from "./event"        ; 
export class EventMachine{
    events : Event[] = [];
    simulationInstant: number = 0;

    public processEvents():void {
        while(this.events.length>0){
        this.events = this.events.sort((event1,event2)=>event1.getTimestamp()-event2.getTimestamp());
        const event = this.events.shift()!; 
        event.processEvent();   
    }
    }
    public addEvent(event:Event){
        this.events.push(event);
    }

    private updateSimulationIntant(newInstant:number){
       if(newInstant<this.simulationInstant) {
            throw new Error('Você não pode voltar no tempo.');
       }
       this.simulationInstant = newInstant;
    }
}