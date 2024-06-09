import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Fetch and save weather' })
  @Post()
  async fetchAndSaveWeather(
    @Body() body: { lat: number; lon: number; part: string },
  ): Promise<WeatherEntity> {
    return await this.weatherService.fetchAndSaveWeatherData({
      lat: body.lat,
      lon: body.lon,
      part: body.part,
    });
  }

  @Get()
  // Better to use query requestSchema with validation like zod or class-validator
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part: string,
  ): Promise<WeatherEntity> {
    return await this.weatherService.getWeatherData(lat, lon, part);
  }
}
