import { h } from "preact";
import styled, { StyledProps } from "styled-components";

import Location from "../../../types/location";
import getCountryName from "../../../util/getCountryName";

const Container = styled.div(
  (props: StyledProps<{}>) => `
  cursor: pointer;
  border-bottom: 1px black solid;
  padding: 0.5em;
  :hover {
    background: ${props.theme.color.surface};
  }
`
);

interface LocationResultProps {
  data: Location;
  onClick?(): void;
}

const LocationResult = ({ data, onClick = () => {} }: LocationResultProps) => (
  <Container onClick={onClick}>
    <span>
      {data.name}, {getCountryName(data.country)}
    </span>
  </Container>
);

export default LocationResult;
