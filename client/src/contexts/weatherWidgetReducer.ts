import h from "preact";
import { useReducer } from "preact/hooks";
import { Unit } from "../../__generated__/globalTypes";

export interface WeatherWidgetState {
  locationIDs: string[];
  selectedUnit: Unit;
}

export enum WeatherWidgetActionType {
  AddWidget,
  RemoveWidget,
  SetUnits,
}

export type WeatherWidgetAction =
  | { type: WeatherWidgetActionType.RemoveWidget; payload: string }
  | { type: WeatherWidgetActionType.AddWidget; payload: string }
  | { type: WeatherWidgetActionType.SetUnits; payload: Unit };

export default function weatherWidgetReducer(
  state: WeatherWidgetState,
  action: WeatherWidgetAction
): WeatherWidgetState {
  switch (action.type) {
    case WeatherWidgetActionType.AddWidget:
      return (() => {
        const locationIDs = [...state.locationIDs, action.payload];
        return { ...state, locationIDs };
      })();
    case WeatherWidgetActionType.RemoveWidget:
      return (() => {
        const locationIDs = state.locationIDs.filter((ID) => ID !== action.payload);
        return { ...state, locationIDs };
      })();
    case WeatherWidgetActionType.SetUnits:
      return { ...state, selectedUnit: action.payload };
    default:
      console.log("Reducer action type not recognised");
      return state;
  }
}
