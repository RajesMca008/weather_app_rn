
import { API_CONFIG } from '../config/config';

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const url = `${API_CONFIG.BASE_URL}?q=${city}&appid=${API_CONFIG.API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data = await response.json();
  //console.log("TEST data:",data);
  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].main,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
};
