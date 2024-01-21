import { TMeasurementEnergyObject } from '@/utils/types';
import { useCallback } from 'react';
import { Line } from 'react-chartjs-2';

type TMeasurementDayLineChartProps = {
    measurementData: TMeasurementEnergyObject[];
}

export const MeasurementDayLineChart = ({ measurementData }: TMeasurementDayLineChartProps) => {
    const gambToShowMeasurementNumberScaleY = ["", "", "", "", "", "", ""];

    const findAndReturnDataLineChart = useCallback(() => {
        const valuesConsumption: number[] = [];

        measurementData.forEach((value) => {
            valuesConsumption.push(value.consumption)
        })

        return valuesConsumption;
    },[measurementData])

    const dataLineChart = {
        labels: gambToShowMeasurementNumberScaleY,
        datasets: [{
            data: findAndReturnDataLineChart(),
            fill: false,
            borderColor: 'rgb(51, 62, 158)',
            tension: 0.1
        }]
    }

    const optionsLine = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false,
            },
        }
    };

    if(!measurementData.length){
        return (
            <div className='border-t pt-5 text-center'>
                <span className='font-medium text-lg'>Ops 😵</span>
                <p>
                    Sem dados de consumo para a data selecionada 
                </p>
            </div>
        )
    }

    return (
        <Line 
            data={dataLineChart}
            options={optionsLine}
            className='max-h-56'
        />
    )
}