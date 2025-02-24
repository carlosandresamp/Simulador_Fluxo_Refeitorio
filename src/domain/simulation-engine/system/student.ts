import { GaussianRandom } from "../util/random-generators";

export type StudentStatus = "aguardando" | "atendido" | "saindo";

export class Student{
    private register?: string;
    public comingTime? : Date;
    public serviceTime?: Date;
    public servedTime: number;
    private status?: StudentStatus;
    private randomGenerator: GaussianRandom;
    private middleTypingTime: number;

    constructor(servedTime: number, middleTypingTime:number){
        this.servedTime = servedTime;
        this.middleTypingTime = middleTypingTime;
        this.randomGenerator = new GaussianRandom();
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

    simulateTypingTime():number{
        const variantionFactor = this.randomGenerator.next();
        const minFactor  = 0.8;
        const maxFactor = 1.2;
        const scaledFactor = minFactor + variantionFactor * (maxFactor - minFactor);

        const typingTime = this.middleTypingTime * scaledFactor;
        console.log(`O estudante levará aproximadamente ${typingTime.toFixed(2)} segundos para digitar a matrícula.`);
        return typingTime;
    }
} 