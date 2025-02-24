import { SimulationParameters} from "@/domain/data-management/Entities/simulation-parameters";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationResults } from "@/domain/data-management/Entities/simulation-results";
import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "../events/eventMachine";
import { InternalQueue } from "../system/internalQueue";
import { ExternalQueue } from "../system/externalQueue";
import { Turnstile } from "../system/turnstile";
import { Service } from "../system/service";
import { Hall } from "../system/hall";

class Simulator{
    private cafeteria;
    private machine;
    private simulation;

    constructor(simulation: Simulation){
        this.simulation = simulation;
        this.cafeteria = new Cafeteria(this.cafeteria.)
    }
}