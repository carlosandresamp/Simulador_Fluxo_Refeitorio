export class Results{
    studentsServed:number;
    middleTimeWaiting:number;
    middleQueueSize:number;

    constructor(studentServed:number, middleTimeWaiting:number, middleQueueSize:number){
        this.studentsServed=studentServed;
        this.middleTimeWaiting=middleTimeWaiting;
        this.middleQueueSize=middleQueueSize;
    }
}