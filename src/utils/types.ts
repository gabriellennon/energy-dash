
export type TMeasurementEnergyObject = {
    id: string;
    reference: string;
    year: number;
    month: number;
    day: number;
    hour: number
    consumption: number;
    agent: string;
    meter: string;
    origin: string;
    intervalInMinutes: number;
    isEstimated: boolean
}

type TConsumptionPerYearObject = {
  measurements: TMeasurementEnergyObject[];
  consumptionsByMonth: {
    [year: string]: number[];
  };
};

export type TGroupedConsumptionPerYear = {
  [year: string]: TConsumptionPerYearObject;
}

export type TMeasurementLineChartProps = {
  measurementData: TMeasurementEnergyObject[];
}