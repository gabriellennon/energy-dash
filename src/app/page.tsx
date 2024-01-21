"use client"
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
  BarElement,
  BarController
} from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/dateRangePicker';
import { MeasurementTable } from '@/components/measurementTable';
import { XCircle } from 'lucide-react'

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMeasurement } from '@/services/measurement.service';
import { TMeasurementEnergyObject } from '@/utils/types';
import { ConsumptionBarChart } from '@/components/consumptionBarChart';
import { MeasurementDayLineChart } from '@/components/measurementDayLineChart';
import { MeasurementWeekLineChart } from '@/components/measurementWeekLineChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { arrayYears, filterByDateRange, generateDaysOfMonth, getCurrentNumberMonth, months } from '@/utils/functions';
import { getYear } from "date-fns";
import { columnsTable } from "@/components/columnsTable";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";


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
  const [measurementData, setMeasurementData] = useState<TMeasurementEnergyObject[] | []>([]);
  const [measurementDataFilteresPerDate, setMeasurementDataFilteresPerDate] = useState<TMeasurementEnergyObject[] | []>([]);
  const [isLoading, setLoading] = useState(false);
  const [filterMeasurementPerDay, setFilterMeasurementPerDay] = useState({
    day: new Date().getDate(),
    month: Number(getCurrentNumberMonth()),
    year: getYear(new Date())
  })

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const handleFilterDataDate = () => {
    const dataFiltered = filterByDateRange(measurementData, dateRange!)
    setMeasurementDataFilteresPerDate(dataFiltered)
  }

  const handleClearSearch = () => {
    setMeasurementDataFilteresPerDate([]);
    setDateRange({
      from: undefined,
      to: undefined,
    })
  }

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setDateRange({ from, to });
  };

  const getMeasurementData = useCallback(() => {
    setLoading(true);
    getMeasurement().then((response) => {
      setMeasurementData(response.data);
      localStorage.setItem('@MeasurementData', JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    })
  },[])

  const filterMonthMeasurement = useMemo(() => {
    const { month, year } = filterMeasurementPerDay;
    return generateDaysOfMonth(year, month)
  }, [filterMeasurementPerDay])

  const setFilterMeasurementPerDaySelect = useCallback((value: string, property: 'day' | 'month' | 'year') => {
    switch (property) {
      case 'day':
        setFilterMeasurementPerDay({ ...filterMeasurementPerDay, day: Number(value)})
        break;
      case 'month':
        setFilterMeasurementPerDay({ ...filterMeasurementPerDay, month: Number(value)})
        break;
      case 'year':
        setFilterMeasurementPerDay({ ...filterMeasurementPerDay, year: Number(value)})
        break;
    
      default:
        break;
    }
    
  }, [filterMeasurementPerDay]);

  const showDataMeasurementPerDate = useCallback(() => {
    const { day, month, year } = filterMeasurementPerDay;
    const fullDate = `${day}/${month}/${year}`;
    const filterData = measurementData.filter(data => data.reference === fullDate);
    return filterData;
  },[filterMeasurementPerDay, measurementData])

  useEffect(() => {
    const measurementDataStorage = localStorage.getItem('@MeasurementData');
    if(measurementDataStorage){
      setMeasurementData(JSON.parse(measurementDataStorage))
    } getMeasurementData()
  }, [getMeasurementData])

  return (
    <main className="flex min-h-screen flex-col items-start p-5 bg-slate-200">
      <div>
        <h1>Dashboard</h1>
        <p>Informações baseadas nos dados de mediações colhidos na CCEE.</p>
      </div>
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
              {isLoading ? (
                <div>carregando</div>
              ): (
                <ConsumptionBarChart measurementData={measurementData} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Medição Horária (Por dia)</CardTitle>
              <CardDescription className="text-xs">
                Lembre-se: Há meses que não possuem 31 dias.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>carregando</div>
              ): (
                <div className='flex flex-col'>
                  <div className="flex flex-row items-center gap-4 mb-4">
                    <Select 
                      defaultValue={filterMeasurementPerDay.day.toString()}
                      onValueChange={(value) =>setFilterMeasurementPerDaySelect(value, 'day')}
                    >
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Dia" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterMonthMeasurement.map((value, index) => (
                            <SelectItem 
                              key={index} 
                              value={String(value)}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                    <Select
                      defaultValue={filterMeasurementPerDay.month.toString()}
                      onValueChange={(value) =>setFilterMeasurementPerDaySelect(value, 'month')}
                    >
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Mês" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map(month => (
                            <SelectItem key={month.number} value={month.number.toString()}>{month.label}</SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                    <Select
                      defaultValue={filterMeasurementPerDay.year.toString()}
                      onValueChange={(value) =>setFilterMeasurementPerDaySelect(value, 'year')}
                    >
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Mês" />
                        </SelectTrigger>
                        <SelectContent>
                          {arrayYears().map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  </div>
                  <MeasurementDayLineChart measurementData={showDataMeasurementPerDate()} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className='p-2 bg'>
          <Card>
            <CardHeader>
              <CardTitle>Medição Histórica (Última Semana)</CardTitle>
            </CardHeader>
            <CardContent className='max-h-72'>
            {isLoading ? (
                <div>carregando</div>
              ): (
                <MeasurementWeekLineChart measurementData={measurementData} />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Medições</h2>
                  <div className="flex items-center gap-2">
                    <DateRangePicker 
                      dateRange={dateRange} 
                      onDateRangeChange={handleDateRangeChange}
                      lang="pt" 
                    />
                    <Button
                      size="sm" 
                      variant="secondary"
                      className="w-24"
                      onClick={measurementDataFilteresPerDate.length ? handleClearSearch : handleFilterDataDate}
                      disabled={!dateRange?.from && !dateRange?.to}
                    >
                      {measurementDataFilteresPerDate.length ? (
                        <XCircle className="h-4 w-4" />
                      ): (<>Aplicar</>)}
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>carregando</div>
              ): (
                <MeasurementTable 
                  columns={columnsTable} 
                  data={measurementDataFilteresPerDate.length ? measurementDataFilteresPerDate : measurementData} 
                />
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
