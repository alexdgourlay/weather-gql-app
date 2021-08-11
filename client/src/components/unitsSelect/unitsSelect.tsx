import preact, { h } from "preact";
import { memo } from "preact/compat";
import styled, { StyledProps } from "styled-components";
import { capital } from "case";
import { ChangeEvent } from "react";

import { Unit } from "../../../__generated__/globalTypes";
import { WeatherWidgetActionType } from "../../contexts/weatherWidgetReducer";
import { useWeatherWidgetState } from "../../contexts/WeatherWidgetContext";

const Container = styled.div``;

const Select = styled.select(
  (props: StyledProps<{}>) =>
    `
  margin-inline-start: ${props.theme.spacing.s};
  height: 2em;
`
);

const UnitsSelect = () => {
  const { state, dispatch } = useWeatherWidgetState();
  const { selectedUnit } = state;

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Unit;
    dispatch({ type: WeatherWidgetActionType.SetUnits, payload: value });
  };

  return (
    <Container>
      <label>Select units</label>
      <Select value={selectedUnit} onChange={handleSelectChange}>
        {Object.entries(Unit).map(([key, value]) => (
          <option key={key} value={value}>
            {capital(value)}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default memo(UnitsSelect);
