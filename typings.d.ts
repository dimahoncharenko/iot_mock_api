type Temperature = number;
type Power = number;
type Consumption = number;
type Timestamp = string;

type Radar = [Power, Consumption, Temperature, Timestamp];

type Params = {
    temperature: number;
    power: number;
    consumption: number;
    production: number;
    charge: number;
}