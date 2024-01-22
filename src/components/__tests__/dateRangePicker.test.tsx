import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, addDays } from 'date-fns';
import { DateRangePicker } from '../dateRangePicker';

describe('DateRangePicker', () => {
  test('renders without crashing', () => {
    render(<DateRangePicker dateRange={undefined} onDateRangeChange={() => {}} />);
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument();
  });
});
