import { faker } from '@faker-js/faker';
import { eachDayOfInterval, getDaysInMonth, subWeeks } from 'date-fns';
import { format } from 'date-fns'; 
import { ptBR } from 'date-fns/locale';

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
}

export function generateConsumptionByYear(measurement: any, year: any, labels: string[]) {
  return labels.map((month) => {
    if (measurement.year === year) {
      return measurement.consumption;
    } else {
      return faker.number.int({ min: 0, max: 1000 });
    }
  });
}

export function generateDaysOfMonth(year: number, month: number) {
  const quantityDays = getDaysInMonth(new Date(year, month));
  const sequenciaNumerica = [];

  for (let i = 0; i <= quantityDays; i++) {
    if(i > 0){
      sequenciaNumerica.push(i);
    }
  }
  return sequenciaNumerica;
}

export const months = [
  {
    label: "Janeiro",
    number: 1
  },
  {
    label: "Fevereiro",
    number: 2
  },
  {
    label: "Março",
    number: 3
  },
  {
    label: "Abril",
    number: 4
  },
  {
    label: "Maio",
    number: 5
  },
  {
    label: "Junho",
    number: 6
  },
  {
    label: "Julho",
    number: 7
  },
  {
    label: "Agosto",
    number: 8
  },
  {
    label: "Setembro",
    number: 9
  },
  {
    label: "Outubro",
    number: 10
  },
  {
    label: "Novembro",
    number: 11
  },
  {
    label: "Dezembro",
    number: 12
  }
]

export function findLabelMonth(monthNumber: number) {
  const findLabelMonth = months.find(month => month.number === monthNumber );
  return findLabelMonth
}

export function getCurrentNumberMonth(){
  return format(new Date(), 'L', { locale: ptBR });
}

export function arrayYears(){
  const currentYear = (new Date()).getFullYear();
  const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  return range(currentYear, currentYear - 50, -1); 
}

export function lastWeekDates(){
  const today = new Date();

  // Subtrai uma semana da data de hoje para obter o início da última semana
  const lastWeekStart = subWeeks(today, 1);

  // Gera um array de datas para a última semana
  const lastWeekDates = eachDayOfInterval({
    start: lastWeekStart,
    end: today,
  }).slice(0, 7); // Limita o array a 7 elementos, para me retornar apenas os 7 ultimos dias

  
  const formattedMontAndDaysDates = lastWeekDates.map(date => format(date, 'dd/MM', { locale: ptBR }));
  const formattedFullDates = lastWeekDates.map(date => format(date, 'dd/MM/yyyy', { locale: ptBR }));

  return {
    formattedMontAndDaysDates,
    formattedFullDates
  };
}