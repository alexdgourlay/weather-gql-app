import { h } from "preact";
import styled from "styled-components";
import { useWeatherWidgetState } from "../../contexts/WeatherWidgetContext";
import { WeatherWidgetActionType } from "../../contexts/weatherWidgetReducer";
import CrossIcon from "../icons/crossIcon";
import { GetWeatherVariables } from "./__generated__/GetWeather";

interface props {
  className?: string;
  locationID: GetWeatherVariables["cityId"];
}

const Button = styled.button``;

const StyledArrowIcon = styled(CrossIcon)`
  width: 8px;
  height: 8px;
`;

const RemoveButton = (props: props) => {
  const { className, locationID } = props;

  const { dispatch } = useWeatherWidgetState();

  return (
    <Button
      className={className}
      onClick={() => {
        if (locationID) {
          dispatch({ type: WeatherWidgetActionType.RemoveWidget, payload: locationID[0] });
        }
      }}
    >
      <StyledArrowIcon />
    </Button>
  );
};

export default RemoveButton;
