export class MockService {
    private _instance?: MockService;
    updateTime = 130000;
    intervalIndex: NodeJS.Timer;

    temperature = 18;
    power = 0;
    consumption = 1.37;
    charge = 170.00;
    production = 0;

    private constructor(initValues: Partial<{
        temperature: number;
        power: number;
        consumption: number;
        charge: number;
        production: number;
    }>) {
        if (initValues.temperature) this.temperature = initValues.temperature;
        if (initValues.power) this.power = initValues.power;
        if (initValues.consumption) this.consumption = initValues.consumption;
        if (initValues.charge) this.charge = initValues.charge;
        if (initValues.production) this.production = initValues.production;
    };

    adjustTemperature(newTemperature: number) {
        const updateIntervalTime = 500;
        const steps = this.updateTime / updateIntervalTime;
        const increment = 100 / steps;

        clearInterval(this.intervalIndex);
        this.intervalIndex = setInterval(() => {

        if (this.temperature >= newTemperature) this.temperature -= increment;
        else if (this.temperature <= newTemperature) this.temperature += increment;

        }, updateIntervalTime);
    }

    instance(initValues?: Partial<{
        temperature: number;
        power: number;
        consumption: number;
        charge: number;
        production: number;
    }>) {
        if (!this._instance) {
            this._instance = new MockService(initValues || {});
        }

        return this._instance;
    }

    updateParams() {
        this.power = Math.random() * 1.4 + 33;
        this.consumption = this.consumption += .005;
        this.charge = this.charge -= .005;
        this.production = Math.random() * 2.00 + 2.00;

        if (this.charge <= 55.00) this.charge = 170.00;
    }
} 