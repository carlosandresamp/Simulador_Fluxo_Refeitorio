import { error } from "console";
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";
import { throwDeprecation } from "process";
import { add } from "date-fns";
import { Student } from "./student";

//Classe de fila externa que recebe uma lista de alunos 
export class ExternalLine{
    public studentQuantity:Student[];
    private listStudentsKey = "externalQueue"; 

    constructor(){
        this.studentQuantity = this.gettingAllFromLocalStorage();
    }


    toAddStudent(student:Student){
        let addingStudentToTheLine = this.gettingAllFromLocalStorage();
        addingStudentToTheLine.push(student);
        this.savingLocalStorage(addingStudentToTheLine);
    }

    toRemoveAluno(student:Student){

    }
    
    //Método auxiliar de armazenamento
    savingLocalStorage(student:Array<Student>){
        let listStudentsWaiting:string = JSON.stringify(student);
        localStorage.setItem(this.listStudentsKey, listStudentsWaiting);
    }

    //Método auxiliar de busca por todos os dados armazenados.
    gettingAllFromLocalStorage():Student[]{
        let studentRegistered:string = localStorage.getItem(this.listStudentsKey);

        if(studentRegistered != null){
            return JSON.parse(studentRegistered);
        }else{
            return [];
        }
    }
}


