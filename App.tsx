import React, { useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import SecureStore from 'expo-secure-store';
import { foresterPaperTheme } from './utils/foresterPaperTheme.util';
import SignIn from './screens/signIn/SignIn.screen';
import { MainApp } from './screens/mainApp/MainApp.screen';
import SignUp from './screens/signUp/SignUp.screen';
import Splash from './screens/splash/Splash.screen';
import { authInitialState, authReducer } from './reducers/auth/auth.reducer';

const Stack = createNativeStackNavigator();

export default function App() {
  // https://reactnavigation.org/docs/auth-flow
  const [auth, authDispatch] = useReducer(authReducer, authInitialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed / there was no userToken in SecureStore
      }
      authDispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    void bootstrapAsync();
  }, []);

  return (
    <PaperProvider theme={foresterPaperTheme}>
      {auth.isLoading ? (
        <Splash />
      ) : (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {auth.userToken !== null ? (
                <Stack.Screen name="MainApp">{(props) => <MainApp {...props} authDispatch={authDispatch} />}</Stack.Screen>
              ) : (
                <>
                  <Stack.Screen name="SignIn">{(props) => <SignIn {...props} authDispatch={authDispatch} />}</Stack.Screen>
                  <Stack.Screen name="SignUp">{(props) => <SignUp {...props} authDispatch={authDispatch} />}</Stack.Screen>
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      )}
    </PaperProvider>
  );
}
