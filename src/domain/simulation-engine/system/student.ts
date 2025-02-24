export type StudentStatus = "aguardando" | "atendido" | "saindo";

export class Student{
    private register?: string;
    public comingTime? : Date;
    public serviceTime?: Date;
    public servedTime: number;
    private status?: StudentStatus;

    constructor(servedTime: number){
        this.servedTime = servedTime;
    }

    getRegister(){
        return this.register;
    }

    setRegister(newRegister:string){
        return this.register=newRegister;
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