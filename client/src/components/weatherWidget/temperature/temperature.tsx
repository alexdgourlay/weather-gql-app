import { h } from "preact";
import styled from "styled-components";
import { Unit } from "../../../../__generated__/globalTypes";
import { GetWeather_getCityById_weather_temperature } from "../__generated__/GetWeather";

interface Props {
  temperature: GetWeather_getCityById_weather_temperature;
  unit: Unit;
}

const temperatureUnitSymbol: Record<Unit, string> = {
  imperial: "°F",
  kelvin: " K",
  metric: "°C",
};

const Text = styled.h4`
  font-weight: normal;
`;

const Temperature = (props: Props) => {
  const { temperature, unit } = props;
  if (!temperature.actual) {
    console.error("Temperature actual is undefined.");
    return null;
  }
  return (
    <Text>
      {temperature.actual.toFixed(0)}
      {temperatureUnitSymbol[unit]}
    </Text>
  );
};

export default Temperature;
