import { h } from "preact";
import { RoutableProps } from "preact-router";

import { Search } from "../../components/index";
import WidgetGrid from "../../components/widgetGrid/widgetGrid";
import UnitsSelect from "../../components/unitsSelect/unitsSelect";
import { WeatherWidgetActionType } from "../../contexts/weatherWidgetReducer";
import { useWeatherWidgetState } from "../../contexts/WeatherWidgetContext";
import styled, { StyledProps } from "styled-components";

const searchWebSocket = new WebSocket("ws://192.168.1.105:8999");

const Container = styled.div`
  height: 100vh;
  padding: var(--global-padding);
  background-color: #e9ecf1;
`;

const HeaderContainer = styled.div(
  (props: StyledProps<{}>) =>
    `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: ${props.theme.spacing.l} 0;
  `
);

const Home = (props: RoutableProps) => {
  const { state, dispatch } = useWeatherWidgetState();
  const { locationIDs } = state;

  return (
    <Container>
      <h2>GraphQL Weather App</h2>
      <HeaderContainer>
        <Search
          webSocket={searchWebSocket}
          onResultSelected={(result) => {
            dispatch({ type: WeatherWidgetActionType.AddWidget, payload: result.id.toString() });
          }}
        />
        <UnitsSelect />
      </HeaderContainer>

      <WidgetGrid cityIDs={locationIDs} />
    </Container>
  );
};

export default Home;
