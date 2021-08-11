import { h, createContext, FunctionComponent } from "preact";
import { useReducer, useContext, useEffect } from "preact/hooks";
import { Unit } from "../../__generated__/globalTypes";

import weatherWidgetReducer, { WeatherWidgetAction, WeatherWidgetState } from "./weatherWidgetReducer";

export const initialWeatherWidgetState: WeatherWidgetState = {
  locationIDs: [],
  selectedUnit: Unit.imperial,
};

const WeatherWidgetContext = createContext<
  { state: WeatherWidgetState; dispatch: (action: WeatherWidgetAction) => void } | undefined
>(undefined);

const STORAGE_KEY = "WeatherWidgetState";

/*
 * Returns stored state if it exists, otherwise returns initial state.
 */
function initialState(): WeatherWidgetState {
  const storageItem = localStorage.getItem(STORAGE_KEY);
  if (storageItem === null) return initialWeatherWidgetState;
  return JSON.parse(storageItem);
}

export const WeatherWidgetProvider: FunctionComponent = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(weatherWidgetReducer, initialState());

  /*
   * Save state to storage every time it updates.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <WeatherWidgetContext.Provider value={{ state, dispatch }}>{children}</WeatherWidgetContext.Provider>;
};

export function useWeatherWidgetState() {
  const context = useContext(WeatherWidgetContext);
  if (context === undefined) {
    throw new Error("useWeatherWidgetState must be used within a WeatherWidgetProvider");
  }
  return context;
}

export default WeatherWidgetContext;
