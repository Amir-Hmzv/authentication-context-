import { useContext, useReducer,createContext } from "react";
import { initialState, reducer } from "./reducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();


export function useAuthState() {
  const context = useContext(AuthStateContext)

  if (!context) {
      throw Error('useAuthState must be used with a AuthProvider')
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext)

  if (!context) {
      throw Error('useAuthDispatch must be used with a AuthProvider')
  }

  return context;
}


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
