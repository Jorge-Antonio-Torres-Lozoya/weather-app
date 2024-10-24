import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../interfaces/weather-data.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<WeatherData> {
    const currentWeatherUrl = `${environment.openWeatherApiUrl}/weather?q=${city}&units=metric&appid=${environment.openWeatherApiKey}`;
    const forecastUrl = `${environment.openWeatherApiUrl}/forecast?q=${city}&units=metric&appid=${environment.openWeatherApiKey}`;

    return forkJoin({
      current: this.http.get(currentWeatherUrl),
      forecast: this.http.get(forecastUrl)
    }).pipe(
      map(response => this.transformWeatherData(response))
    );
  }

  private transformWeatherData(response: any): WeatherData {
    const current = response.current;
    const forecast = response.forecast;

    return {
      current: {
        temp: Math.round(current.main.temp),
        feels_like: Math.round(current.main.feels_like),
        condition: current.weather[0].main,
        humidity: current.main.humidity,
        wind_speed: Math.round(current.wind.speed * 3.6) // Convert m/s to km/h
      },
      forecast: forecast.list
        .filter((item: any, index: number) => index % 8 === 0) // Get data for every 24 hours
        .slice(0, 5) // Get only 5 days
        .map((item: any) => ({
          day: new Date(item.dt * 1000).toLocaleDateString('es-ES', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main
        }))
    };
  }
}
