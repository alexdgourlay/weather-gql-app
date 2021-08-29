import { h } from "preact";
import { useMemo } from 'preact/hooks'
import { RoutableProps } from "preact-router";

import { Search } from "../../components/index";
import WidgetGrid from "../../components/widgetGrid/widgetGrid";
import UnitsSelect from "../../components/unitsSelect/unitsSelect";
import { WeatherWidgetActionType } from "../../contexts/weatherWidgetReducer";
import { useWeatherWidgetState } from "../../contexts/WeatherWidgetContext";
import styled, { StyledProps } from "styled-components";

const Container = styled.div`
  height: 100vh;
  padding: var(--global-padding);
  background-color: #e9ecf1;
`;

const InnerContainer = styled.div`
  max-width: 1600px;
  margin: auto;
`

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

// eslint-disable-next-line no-unused-vars
const Home = (props: RoutableProps) => {
  const { state, dispatch } = useWeatherWidgetState();
  const { locationIDs } = state;

  const searchWebSocket = useMemo(() => new WebSocket("wss://gql-weather-server.herokuapp.com"), []);

  return (
    <Container>
      <InnerContainer>

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
      </InnerContainer>
    </Container>
  );
};

export default Home;
