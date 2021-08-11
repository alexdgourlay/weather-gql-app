import { h } from "preact";
import styled, { StyledProps } from "styled-components";

import WeatherWidget from "../weatherWidget/weatherWidget";

interface WidgetGridProps {
  cityIDs: string[];
}

const Container = styled.div(
  (props: StyledProps<{}>) => `
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props.theme.spacing.m};
`
);

const WidgetGrid = (props: WidgetGridProps) => {
  const { cityIDs } = props;

  return (
    <Container>
      {cityIDs.map((cityID) => (
        <WeatherWidget key={cityID} locationID={[cityID]} />
      ))}
    </Container>
  );
};

export default WidgetGrid;
