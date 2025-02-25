export class GaussianRandom {
    private lastRandom: number | null = null;

    next(): number {
        if (this.lastRandom !== null) {
            const result = this.lastRandom;
            this.lastRandom = null;
            return result;
        }

        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();

        const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        this.lastRandom = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v);

        return num;
    }
}

export interface RandomGeneratorI {
    next(): number;
} 