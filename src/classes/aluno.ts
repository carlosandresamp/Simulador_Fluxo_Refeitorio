export class Aluno{
    private matricula: string;
    public tempoChegada : Date;
    public tempoAtendido: Date;
    public tempoServico: Date;
    public status : string ;

    constructor(matricula:string, tempoChegada:Date, tempoAtendido:Date, tempoServico:Date, status:string){
        this.matricula = matricula;
        this.tempoChegada = tempoChegada;
        this.tempoAtendido = tempoAtendido;
        this.tempoServico = tempoServico;
        this.status = status;

    }

    getmatricula(){
        return this.matricula;
    }
    setmatricula(matricula:string){
        this.matricula = matricula
        
    }
} 