class OpenWeatherError extends Error {
  constructor(
    message: string,
    readonly cause: unknown,
  ) {
    super(message);
  }
}

export default OpenWeatherError;
