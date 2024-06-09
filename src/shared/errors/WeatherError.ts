class WeatherError extends Error {
  constructor(
    message: string,
    readonly cause: unknown,
  ) {
    super(message);
  }
}

export default WeatherError;
