import React, { createContext, useReducer } from 'react';
import { AuthState } from '../interfaces/authReducer/AuthReducer.interface';
import { authInitialState, authReducer } from '../reducers/auth/auth.reducer';
import SecureStore from 'expo-secure-store';

export type AuthContextType = {
  auth: AuthState;
  signIn: (accessToken: string) => void;
  signOut: () => void;
  restoreToken: (accessToken: string | null) => void;
} | null;

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(null);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  // https://reactnavigation.org/docs/auth-flow
  const [auth, dispatch] = useReducer(authReducer, authInitialState);
  const signIn = (accessToken: string) => {
    dispatch({ type: 'SIGN_IN', accessToken });
  };
  const signOut = () => {
    dispatch({ type: 'SIGN_OUT' });
  };
  const restoreToken = (accessToken: string | null) => {
    dispatch({ type: 'RESTORE_TOKEN', accessToken });
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let accessToken: string | null = null;
      try {
        accessToken = await SecureStore.getItemAsync('accessToken');
      } catch (e) {
        // Restoring token failed / there was no accessToken in SecureStore
      }
      restoreToken(accessToken);
    };
    void bootstrapAsync();
  }, []);

  return <AuthContext.Provider value={{ auth, signIn, signOut, restoreToken }}>{children}</AuthContext.Provider>;
};
