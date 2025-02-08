export type StudentStatus = "aguardando" | "atendido" | "saindo";

export class Student{
    private readonly register: string;
    public readonly comingTime : Date;
    public readonly serviceTime: Date;
    public readonly servedTime: Date;
    public status : StudentStatus;

    constructor(register:string, comingTime:Date, serviceTime:Date, servedTime:Date, status:StudentStatus){
        this.register=register;
        this.comingTime=comingTime;
        this.serviceTime=serviceTime;
        this.servedTime=servedTime;
        this.status=status;
    }

    getregister(){
        return this.register;
    }

    getStatus(){
        return this.status;
    }
    setStatus(newStatus: StudentStatus):void{
        if(!["aguardando", "atendido", "saindo"].includes(newStatus)){
            throw new Error(`Status Inválido: ${newStatus}`);
        }
        this.status = newStatus;
    }

} 