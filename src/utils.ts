export type Temperature = number;
export type Power = number;
export type Consumption = number;
export type Timestamp = string;

export type Radar = [Power, Consumption, Temperature, Timestamp];

export type Params = {
    temperature: number;
    power: number;
    consumption: number;
    production: number;
    charge: number;
}