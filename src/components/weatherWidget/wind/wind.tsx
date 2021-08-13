import { h } from "preact";
import styled, { StyledProps } from "styled-components";
import { Unit } from "../../../../__generated__/globalTypes";
import ArrowIcon from "../../icons/arrowIcon";
import { GetWeather_getCityById_weather_wind } from "../__generated__/GetWeather";

interface Props {
  wind: GetWeather_getCityById_weather_wind;
  unit: Unit;
}

const speedUnitSymbol: Record<Unit, string> = {
  imperial: "mph",
  kelvin: "m/s",
  metric: "m/s",
};

enum CompassInitials {
  North = "N",
  NorthEast = "NE",
  East = "E",
  SoutEast = "SE",
  South = "S",
  SouthWest = "SW",
  West = "W",
  NorthWest = "NW",
}

function getCompassInitials(deg: number): CompassInitials {
  const values = Object.values(CompassInitials);
  const angle = (180 + deg) % 360;
  const indexOfCompassInitial = Math.round((angle / 360) * values.length);
  return values[indexOfCompassInitial];
}

const Container = styled.div(
  (props: StyledProps<{}>) => `
  position: relative;
  display: grid;
  grid-column-gap: ${props.theme.spacing.s};
  grid-row-gap: ${props.theme.spacing.xxs};
  grid-template-columns: min-content auto;
  grid-template-areas:
    "icon direction"
    "icon speed";
`
);

const WindArrow = styled(ArrowIcon)(
  (props: StyledProps<{ rotation: number }>) =>
    `
  grid-area: icon;
  place-self: center;
  overflow: visible;
  width: 1em;
  height: 1em;
  transform: rotate(${props.rotation - 90}deg);
  path {
    fill: ${props.theme.color.strongGrey}; 
  }
  `
);

const Speed = styled.p`
  display: block;
  grid-area: speed;
`;

const Direction = styled.p`
  display: block;
  grid-area: direction;
`;

const Wind = (props: Props) => {
  const { wind, unit } = props;

  return (
    <Container>
      {wind.deg && (
        <>
          <WindArrow rotation={wind.deg} />
          <Direction>{getCompassInitials(wind.deg)}</Direction>
        </>
      )}
      {wind.speed && (
        <Speed>
          {wind.speed.toFixed(0)} {speedUnitSymbol[unit]}
        </Speed>
      )}
    </Container>
  );
};

export default Wind;
