/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWeather
// ====================================================

export interface GetWeather_getCityById_weather_summary {
  __typename: "Summary";
  title: string | null;
  description: string | null;
  icon: string | null;
}

export interface GetWeather_getCityById_weather_temperature {
  __typename: "Temperature";
  actual: number | null;
}

export interface GetWeather_getCityById_weather_wind {
  __typename: "Wind";
  speed: number | null;
  deg: number | null;
}

export interface GetWeather_getCityById_weather_clouds {
  __typename: "Clouds";
  all: number | null;
  visibility: number | null;
  humidity: number | null;
}

export interface GetWeather_getCityById_weather {
  __typename: "Weather";
  summary: GetWeather_getCityById_weather_summary | null;
  temperature: GetWeather_getCityById_weather_temperature | null;
  wind: GetWeather_getCityById_weather_wind | null;
  clouds: GetWeather_getCityById_weather_clouds | null;
  timestamp: number | null;
}

export interface GetWeather_getCityById {
  __typename: "City";
  weather: GetWeather_getCityById_weather | null;
}

export interface GetWeather {
  getCityById: (GetWeather_getCityById | null)[] | null;
}

export interface GetWeatherVariables {
  cityId?: string[] | null;
}
