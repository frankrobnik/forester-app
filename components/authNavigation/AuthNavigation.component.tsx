import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/Auth.context';
import { MainApp } from '../../screens/mainApp/MainApp.screen';
import SignIn from '../../screens/signIn/SignIn.screen';
import SignUp from '../../screens/signUp/SignUp.screen';
import Splash from '../../screens/splash/Splash.screen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext?.auth.isLoading ? (
        <Splash />
      ) : (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {authContext?.auth.accessToken !== null ? (
                <Stack.Screen name="MainApp" component={MainApp} />
              ) : (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ animationTypeForReplace: authContext?.auth.isSignout ? 'pop' : 'push' }}
                  />
                  <Stack.Screen name="SignUp" component={SignUp} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      )}
    </>
  );
};

export default AuthNavigation;
