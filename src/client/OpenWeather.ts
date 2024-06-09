import OpenWeatherError from '../shared/errors/OpenWeatherError';

export class OpenWeather {
  static async getWeather({
    lat,
    lon,
    part,
  }: {
    lat: number;
    lon: number;
    part: string;
  }) {
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;

      const response = await fetch(url);

      return response.json();
    } catch (error) {
      throw new OpenWeatherError('Error fetching weather', error);
    }
  }
}
