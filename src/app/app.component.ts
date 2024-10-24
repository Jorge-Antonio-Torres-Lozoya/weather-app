import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherCardComponent,ForecastCardComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'weather-app';
  city?: string;
  error?: string;
  weather?: any;
  day?:string;
  currentTime?:string;


  ngOnInit() {
    console.log('App component initialized');
  }

  searchWeather() {
  }

  ngOnDestroy() {
    console.log('App component destroyed');
  }

}
