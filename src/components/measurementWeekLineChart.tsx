import { Line } from 'react-chartjs-2';

export const MeasurementWeekLineChart = () => {
    // @TO-DO: Pegar isso dinamicamente
    const lastWeekDays = ["20/12", "19/12", "17/12", "16/12", "15/12", "14/12", "12/12"];

    const dataLineChat = {
        labels: lastWeekDays,
        datasets: [{
            // @To-DO: Pegar dinamicamente
            data: [120,80,104,96,88,90,80],
            fill: false,
            borderColor: 'rgb(51, 62, 158)',
            tension: 0.1
        }]
    }

    // @TO-DO: Ver como posso desabilitar as linhas verticais
    const optionsLine = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
    };


    return (
        <Line 
            data={dataLineChat} 
            options={optionsLine} 
        />
    )
}