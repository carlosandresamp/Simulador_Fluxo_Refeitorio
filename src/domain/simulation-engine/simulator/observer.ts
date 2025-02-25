import { Results } from "./results";


export class Observer{
     studentServedQuantity:number;
     sumWaitingTime:number;
     QueueSizes:number[];

     constructor(){
         this.studentServedQuantity=0;
         this.sumWaitingTime=0;
         this.QueueSizes=[];
     }

     noticeStudentServed(){
         this.studentServedQuantity++;
     }

     noticeWaitingTime(waitinTime:number){
         this.sumWaitingTime = this.sumWaitingTime + waitinTime;
     }

     noticeQueueSize(size:number){
         this.QueueSizes.push(size);
     }

     public computeResults():Results{
         const _middleTimeWaiting = this.sumWaitingTime / this.studentServedQuantity;
         const _queueSize = this.QueueSizes.reduce((a, b)=>a+b) / this.QueueSizes.length;
         return new Results(this.studentServedQuantity, _middleTimeWaiting, _queueSize);
     }
}