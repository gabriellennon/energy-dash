"use client"
import { Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Tooltip,
  Filler,
  ChartConfiguration,
  BarElement,
  BarController
} from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/dateRangePicker';
import { MeasurementTable } from '@/components/measurementTable';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
  Title,
  BarElement,
  BarController
);

export default function Home() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
  };

  // @TO-DO: Ver como posso desabilitar as linhas verticais
  const optionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              // max: 3,
              // min: 1,
              // stepSize: 1,
              callback: function(label: any, index: any, labels: any) {
                  switch (label) {
                      case 0:
                          return `${label} (MWh)`;
                      default:
                        return `${label} (MWh)`;
                  }
              }
          }
      }],
    }
  };

  // @TO-DO: Pegar isso dinamicamente
  const lastWeekDays = ["20/12", "19/12", "17/12", "16/12", "15/12", "14/12", "12/12"];

  const dataLineChat = {
    labels: lastWeekDays,
    datasets: [{
      data: [120,80,104,96,88,90,80],
      fill: false,
      borderColor: 'rgb(51, 62, 158)',
      tension: 0.1
    }]
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-5 bg-slate-200">
      <div>
        <h1>Dashboard</h1>
        <p>Informações baseadas nos dados de mediações colhidos na CCEE.</p>
      </div>
      {/* <Line data={data} options={options}></Line> */}
      <section className="flex-1 space-y-4 pt-4">
        <div className='p-2 grid gap-4 grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Consumo Anual (2021/2022)</CardTitle>
              <CardDescription>
                Comparativo mensal do consumo realizado nos anos de 2021 e 2022.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Bar data={data} options={options} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={data} options={options} />
            </CardContent>
          </Card>
        </div>
        <div className='p-2 bg'>
          <Card>
            <CardHeader>
              <CardTitle>Medição Histórica (Última Semana)</CardTitle>
            </CardHeader>
            <CardContent className='max-h-72'>
              <Line 
                data={dataLineChat} 
                options={optionsLine} 
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Medições</h2>
                  <div className="flex items-center space-x-2">
                    <DateRangePicker />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='max-h-72'>
              <MeasurementTable />
              <div className='mt-3'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
