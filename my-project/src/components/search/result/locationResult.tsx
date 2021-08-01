import { h } from "preact";
import styled from "styled-components";

import countries from "../../../assets/data/countries.json";
import Location from "../../../types/location";

const getCountryName = (countryISO: string): string | undefined =>
  countries.find((country) => country.Code === countryISO)?.Name.split(",")[0];

const Container = styled.div`
  border: 1px black solid;
  padding: 0.5em;
`;

interface LocationResultProps {
  data: Location;
  onClick?(): void;
}

const LocationResult = ({ data, onClick = () => {} }: LocationResultProps) => (
  <Container onClick={onClick}>
    <span>{data.name}</span>
    <br />
    <span>{getCountryName(data.country)}</span>
  </Container>
);

export default LocationResult;
