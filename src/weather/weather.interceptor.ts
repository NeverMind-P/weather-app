import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const weather = data.data.current;
        return {
          sunrise: weather.sunrise,
          sunset: weather.sunset,
          temp: weather.temp,
          feels_like: weather.feels_like,
          pressure: weather.pressure,
          humidity: weather.humidity,
          uvi: weather.uvi,
          wind_speed: weather.wind_speed,
        };
      }),
    );
  }
}
