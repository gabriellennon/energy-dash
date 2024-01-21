import { generateConsumptionByYear, getRandomColor } from '@/utils/functions';
import { TGroupedConsumptionPerYear, TMeasurementEnergyObject } from '@/utils/types';
import { Bar } from 'react-chartjs-2';

type TConsumptionBarChartProps = {
    measurementData: TMeasurementEnergyObject[];
}

export const ConsumptionBarChart = ({ measurementData }: TConsumptionBarChartProps) => {
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    function generateYearsConsumption() {
        const groupedConsumptionPerYear: TGroupedConsumptionPerYear = {};
    
        measurementData.forEach((measurement) => {
          const year = measurement.year;
      
          if (!groupedConsumptionPerYear[year]) {
            groupedConsumptionPerYear[year] = {
              measurements: [],
              consumptionsByMonth: {},
            };
          }
          groupedConsumptionPerYear[year].measurements.push(measurement);
    
           // Gera os dados dos meses apenas se o ano for igual
          groupedConsumptionPerYear[year].consumptionsByMonth[year] = generateConsumptionByYear(measurement, year, labels);
        });


        const result = Object.entries(groupedConsumptionPerYear).map(([year, { consumptionsByMonth }]) => ({
          label: year,
          data: consumptionsByMonth[year],
          backgroundColor: getRandomColor(),
        }));
    
        return result;
    }

    const data = {
        labels,
        datasets: generateYearsConsumption(),
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            }
        },
    };

    return (
        <Bar data={data} options={options} />
    )
}