import { unixToDate } from '../TimestampConverter';

it('1970-01-01 00:00:00', () => {
  expect(unixToDate(0)).toEqual([
    {
      name: 'Year',
      value: 1970,
    },
    {
      name: 'Month',
      value: 1,
    },
    {
      name: 'Day',
      value: 1,
    },
    {
      name: 'Hour',
      value: 0,
    },
    {
      name: 'Minute',
      value: 0,
    },
    {
      name: 'Second',
      value: 0,
    },
  ]);
});
it('2020-01-01 00:00:00', () => {
  expect(unixToDate(1577836800)).toEqual([
    {
      name: 'Year',
      value: 2020,
    },
    {
      name: 'Month',
      value: 1,
    },
    {
      name: 'Day',
      value: 1,
    },
    {
      name: 'Hour',
      value: 0,
    },
    {
      name: 'Minute',
      value: 0,
    },
    {
      name: 'Second',
      value: 0,
    },
  ]);
});
