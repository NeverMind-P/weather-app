import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherEntity } from './entities/weather.entity';
import WeatherError from '../shared/errors/WeatherError';
import { OpenWeather } from '../client/OpenWeather';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private weatherRepository: Repository<WeatherEntity>,
  ) {}

  async fetchAndSaveWeatherData(request: {
    lat: number;
    lon: number;
    part: string;
  }): Promise<WeatherEntity> {
    try {
      const weather = await OpenWeather.getWeather(request);
      const weatherData = this.weatherRepository.create({
        lat: request.lat,
        lon: request.lon,
        part: request.part,
        data: weather,
      });
      return await this.weatherRepository.save(weatherData);
    } catch (error) {
      throw new WeatherError('Can not get and save weather data', error);
    }
  }

  async getWeatherData(
    lat: number,
    lon: number,
    part: string,
  ): Promise<WeatherEntity> {
    try {
      return await this.weatherRepository.findOne({
        where: { lat, lon, part },
      });
    } catch (error) {
      throw new WeatherError('Can not get weather data', error);
    }
  }
}
