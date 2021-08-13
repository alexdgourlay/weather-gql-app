import { h } from "preact";
import { useEffect } from 'preact/hooks'
import { RoutableProps } from "preact-router";

import { Search } from "../../components/index";
import WidgetGrid from "../../components/widgetGrid/widgetGrid";
import UnitsSelect from "../../components/unitsSelect/unitsSelect";
import { WeatherWidgetActionType } from "../../contexts/weatherWidgetReducer";
import { useWeatherWidgetState } from "../../contexts/WeatherWidgetContext";
import styled, { StyledProps } from "styled-components";

const createSearchWebsocket = () => new WebSocket("wss://gql-weather-server.herokuapp.com");
let searchWebSocket= createSearchWebsocket();

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

// eslint-disable-next-line no-unused-vars
const Home = (props: RoutableProps) => {
  const { state, dispatch } = useWeatherWidgetState();
  const { locationIDs } = state;

  useEffect(() => {
    searchWebSocket.onclose = () => {
      console.log('web socket closed');
      searchWebSocket = createSearchWebsocket();
    }
    return () => {
      searchWebSocket.close();
    }
  }, [])


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
