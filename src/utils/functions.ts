import { faker } from '@faker-js/faker';

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