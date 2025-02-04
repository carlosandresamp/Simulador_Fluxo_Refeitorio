import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Aluno} from './classes/aluno.ts';
import { FilaExterna } from './classes/filaExterna.ts';
import { ServerIcon } from 'lucide-react';

createRoot(document.getElementById("root")!).render(<App />);


let comingTime = new Date("12:00");
let serviceTime = new Date("12:20");
let servedTime = new Date("12:35");

let students = new Aluno("2024116TADS0012", comingTime, serviceTime, servedTime, "Eating");
let theLine = new FilaExterna();
let addingStudentToTheLine = theLine.toAddStudent()


if()