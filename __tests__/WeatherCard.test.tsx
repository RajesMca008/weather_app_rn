import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../src/components/WeatherCard';
import { WeatherData } from '../src/services/weatherService';

const mockWeather: WeatherData = {
  city: 'London',
  temperature: 15,
  condition: 'Cloudy',
  icon: 'http://openweathermap.org/img/wn/04d@2x.png',
};

describe('WeatherCard Component', () => {
  it('renders correctly with weather data', () => {
    console.log("TEST",mockWeather);
    const { getByText } = render(<WeatherCard weather={mockWeather} />);
    expect(getByText('London')).toBeTruthy();
    expect(getByText('15°C')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
  });
});
