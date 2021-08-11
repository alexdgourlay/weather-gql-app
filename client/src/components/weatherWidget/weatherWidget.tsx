import { h } from "preact";
import { useEffect } from "preact/hooks";
import { useQuery, gql } from "@apollo/client";
import styled, { StyledProps } from "styled-components";
import { sentence } from "case";

import { GetWeather, GetWeatherVariables } from "./__generated__/GetWeather";
import { useWeatherWidgetState } from "../../contexts/WeatherWidgetContext";
import Temperature from "./temperature/temperature";
import Wind from "./wind/wind";
import RemoveButton from "./removeButton";
import { hoverEnabled } from "../../util/mediaQueries";

const Weather = gql`
  query GetWeather($cityId: [String!], $config: ConfigInput) {
    getCityById(id: $cityId, config: $config) {
      name
      country
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

const StyledRemoveButton = styled(RemoveButton)(
  (props: StyledProps<{}>) => `
    position: absolute;
    top: ${props.theme.spacing.s};
    right: ${props.theme.spacing.s};

    ${hoverEnabled} {
      display: none;
    }
`
);

const Container = styled.div(
  (props: StyledProps<{}>) => `
  position: relative;
  width: 100%;
  max-width: 450px;
  background-color: ${props.theme.color.surface};
  padding: ${props.theme.spacing.xs} ${props.theme.spacing.l}  ${props.theme.spacing.m} ${props.theme.spacing.l};
  display: grid;
  grid-row-gap: ${props.theme.spacing.s};
  grid-column-gap: ${props.theme.spacing.m};
  grid-template-columns: 50% 50%;
  grid-template-areas: 
    "head head"
    "location location"
    "summary wind";
  place-items: center;
  transition: backdrop-filter 0.4s linear;

  &:hover ${StyledRemoveButton} {
    display: initial;
  }
`
);

const Head = styled.div(
  (props: StyledProps<{}>) => `
    grid-area: head;
    display: flex;
    flex-direction: row;
    align-items: center;
`
);

const Icon = styled.img`
  width: 64px;
  height: 64px;
`;

const Location = styled.div(
  (props: StyledProps<{}>) => `
  grid-area: location;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
);

const City = styled.h4`
  margin: 0;
`;

const Country = styled.h5`
  margin: 0;
  font-size: 0.7em;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  justify-self: start;
  font-size: 0.8em;
`;

const SummaryContainer = styled(Info)`
  grid-area: summary;
`;

const WindContainer = styled(Info)`
  grid-area: wind;
`;

const PropertyHeader = styled.p(
  (props: StyledProps<{}>) => `
    font-size: 0.8em;
    color: ${props.theme.color.strongGrey};
    margin: ${props.theme.spacing.s} 0;
`
);

interface WeatherWidgetProps extends GetWeatherVariables {
  className?: string;
  locationID: GetWeatherVariables["cityId"];
}

const WeatherWidget = (props: WeatherWidgetProps) => {
  const { className, locationID } = props;

  const { state } = useWeatherWidgetState();
  const { selectedUnit } = state;

  const { data, previousData, refetch } = useQuery<GetWeather, GetWeatherVariables>(Weather, {
    variables: { cityId: locationID, config: { units: selectedUnit } },
  });
  const loadedData = data || previousData;

  useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetch();
    }, 20000);
    return () => {
      clearInterval(refetchInterval);
    };
  }, []);

  return (
    <Container className={className}>
      <StyledRemoveButton locationID={locationID} />

      {(() => {
        if (!loadedData?.getCityById?.length) return null;
        const cityName = loadedData.getCityById[0]?.name;
        const country = loadedData.getCityById[0]?.country;
        const weather = loadedData.getCityById[0]?.weather;
        return (
          <>
            <Head>
              {weather?.summary?.icon && (
                <Icon src={`http://openweathermap.org/img/wn/${weather.summary.icon}@2x.png`}></Icon>
              )}
              {weather?.temperature && <Temperature temperature={weather.temperature} unit={selectedUnit} />}
            </Head>

            <Location>
              <City>{cityName}</City>
              <Country>{country}</Country>
            </Location>

            <SummaryContainer>
              <PropertyHeader>SUMMARY</PropertyHeader>
              {weather?.summary?.description && <p>{sentence(weather.summary.description)}</p>}
            </SummaryContainer>

            <WindContainer>
              <PropertyHeader>WIND</PropertyHeader>
              {weather?.wind && <Wind wind={weather.wind} unit={selectedUnit} />}
            </WindContainer>
          </>
        );
      })()}
    </Container>
  );
};

export default WeatherWidget;
