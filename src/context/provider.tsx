import { useReducer, FC, ReactNode, useMemo } from "react";

import AppContext from "./context";
import appReducer from "./reducer";

type Props = {
  children: ReactNode;
};

const AppContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {});

  const values = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
