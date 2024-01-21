import { lastWeekDates } from '@/utils/functions';
import { TMeasurementLineChartProps } from '@/utils/types';
import { useCallback, useMemo } from 'react';
import { Line } from 'react-chartjs-2';


export const MeasurementWeekLineChart = ({ measurementData }: TMeasurementLineChartProps) => {
    const lastWeekDays = useMemo(() => lastWeekDates().formattedMontAndDaysDates, []);

    const findAndReturnDataLineChart = useCallback(() => {
        const valuesConsumption: number[] = [];

        lastWeekDates().formattedFullDates.forEach(date => {
            const filter = measurementData.filter(value => value.reference === date);
            valuesConsumption.push(filter.length ? filter[0].consumption : 0);
        })

        return valuesConsumption;
    },[measurementData])

    const dataLineChat = {
        labels: lastWeekDays,
        datasets: [{
            data: findAndReturnDataLineChart(),
            fill: true,
            backgroundColor: 'rgba(63, 73, 163, 0.123)',
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


    return (
        <Line 
            data={dataLineChat} 
            options={optionsLine} 
        />
    )
}