export class Student{
    private register: string;
    public comingTime : Date;
    public serviceTime: Date;
    public servedTime: Date;
    public status : string ;

    constructor(register:string, comingTime:Date, serviceTime:Date, servedTime:Date, status:string){
        this.register=register;
        this.comingTime=comingTime;
        this.serviceTime=serviceTime;
        this.servedTime=servedTime;
        this.status=status;
    }

    getregister(){
        return this.register;
    }
    setregister(register:string){
        this.register=register;
        
    }
} 