import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WeatherCardComponent,
    ForecastCardComponent,
    NavbarComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';
  city?: string;
  error?: string;
  weather?: any;
  day?: string;
  currentTime?: Date;
  loading?: boolean;
  input?: string;

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (this.input) {
      this.loading = true;
      this.error = '';
      this.weather = null;

      this.weatherService.getWeatherData(this.input).subscribe({
        next: (data) => {
          this.weather = data;
          this.city = this.input?.toUpperCase();
          this.loading = false;
          this.currentTime = new Date();
          console.log(data);

        },
        error: (error) => {
          this.error =
            'There was an error fetching the weather data. Please try again later.';
          this.loading = false;
        },
      });
    }
  }
}
