/* eslint-disable no-param-reassign */

import { AppAction, AppState } from "../types";

const appReducer = (state: AppState, { type, payload }: AppAction) => {
  switch (type) {
    case "SET_SEASONS":
      state.seasons = payload;
      break;

    case "SET_RACES":
      state.races = payload;
      break;

    case "SET_SELECTED_SEASON":
      state.selectedSeason = payload;
      break;

    case "SET_SELECTED_RACE":
      state.selectedRace = payload;
      break;

    default:
      throw new Error("The app reducer did not recognise your action type.");
  }

  return { ...state };
};

export default appReducer;
