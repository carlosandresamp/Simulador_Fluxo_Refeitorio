export interface MetricOverTime {
    timestamp: number;
    value: number;
    validateNonNegative(): void;
    toGraphPoint(): { x: number; y: number };
}

export class MetricOverTimeImpl implements MetricOverTime {
    constructor(
        public timestamp: number,
        public value: number
    ) {}

    validateNonNegative(): void {
        if (this.value < 0) throw new Error("Metric value cannot be negative");
    }

    toGraphPoint(): { x: number; y: number } {
        return { x: this.timestamp, y: this.value };
    }
} 