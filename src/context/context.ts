import { createContext } from "react";
import { AppAction, AppState } from "../types";

export default createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: {},
  dispatch: () => null,
});
