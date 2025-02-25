import { SimulationResults } from "../../../domain/data-management/Entities/simulation-results";
import { MetricOverTime, MetricOverTimeImpl } from "../../../domain/data-management/Entities/metric-over-time";

export class Observer {
    private intertalQueueSizeOverTime: number[] = [];
    private externalQueueSizeOverTime: number[] = [];
    private tableOccupancyOverTime: number[] = [];
    private waitTimes: number[] = [];
    private simulationDuration: number = 0;
    
    noticeInternalQueueSize(size: number) {
        this.intertalQueueSizeOverTime.push(Math.max(0, size));
    }
    
    noticeExternalQueueSize(size: number) {
        this.externalQueueSizeOverTime.push(Math.max(0, size));
    }
    
    noticeTableOccupancy(occupancy: number) {
        this.tableOccupancyOverTime.push(Math.max(0, occupancy));
    }
    
    noticeWaitTime(time: number) {
        this.waitTimes.push(time);
    }
    
    setSimulationDuration(duration: number) {
        this.simulationDuration = duration;
    }

    private createMetrics(values: number[]): MetricOverTime[] {
        return values.map((value, index) => new MetricOverTimeImpl(index, value));
    }
    
    private calculateAverage(numbers: number[]): number {
        return numbers.length > 0 
            ? numbers.reduce((a, b) => a + b) / numbers.length 
            : 0;
    }
    
    computeResults(): SimulationResults {
        const maxTableOccupancy = this.tableOccupancyOverTime.length > 0 
            ? Math.max(...this.tableOccupancyOverTime)
            : 0;

        return new SimulationResults(
            this.createMetrics(this.intertalQueueSizeOverTime),
            this.createMetrics(this.externalQueueSizeOverTime),
            this.createMetrics(this.tableOccupancyOverTime),
            this.calculateAverage(this.waitTimes),
            this.calculateAverage(this.externalQueueSizeOverTime),
            this.calculateAverage(this.intertalQueueSizeOverTime),
            maxTableOccupancy,
            this.simulationDuration,
            this.simulationDuration
        );
    }
} 