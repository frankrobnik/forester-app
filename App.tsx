import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from './screens/signIn/SignIn.screen';
import { MainApp } from './screens/mainApp/MainApp.screen';
import SignUp from './screens/signUp/SignUp.screen';
import Splash from './screens/splash/Splash.screen';

const Stack = createNativeStackNavigator();

export default function App() {
  // https://reactnavigation.org/docs/auth-flow
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  if (isLoading) {
    return <Splash />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isSignedIn ? (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <Stack.Screen name="MainApp" component={MainApp} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
