import { h } from "preact";
import { useQuery, gql } from "@apollo/client";

import { GetWeather } from "./__generated__/GetWeather";

interface GetWeatherVars {
  cityId: [string];
}

const Weather = gql`
  query GetWeather($cityId: [String!]) {
    getCityById(id: $cityId) {
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;

const kelvinToDegrees = (kelvin: number): number => kelvin - 273.15;

interface WeatherWidgetProps extends GetWeatherVars {}

const WeatherWidget = (props: WeatherWidgetProps) => {
  const { cityId } = props;

  const { data } = useQuery<GetWeather, GetWeatherVars>(Weather, {
    variables: { cityId: cityId },
  });

  if (!data?.getCityById?.length) return null;

  const weather = data.getCityById[0]?.weather;

  console.log("weather :>> ", weather);

  return (
    <div>
      <h2>{cityId} Weather</h2>
      {weather?.temperature?.actual &&
        kelvinToDegrees(weather.temperature.actual).toFixed(1)}
    </div>
  );
};

export default WeatherWidget;
