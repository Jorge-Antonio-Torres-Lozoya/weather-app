export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    condition: string;
    humidity: number;
    wind_speed: number;
  };
  forecast: {
    day: string;
    temp: number;
    condition: string;
  }[];
}
