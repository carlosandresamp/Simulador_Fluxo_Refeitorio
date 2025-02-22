import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import './index.css';
import { ServerIcon } from 'lucide-react';
import { Student } from './domain/simulation-engine/system/student.ts';
import { Hall } from './domain/simulation-engine/system/hall.ts';
import internal from 'stream';

createRoot(document.getElementById("root")!).render(<App />);
