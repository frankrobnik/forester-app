import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { foresterPaperTheme } from './utils/foresterPaperTheme.util';
import { AuthContextProvider } from './context/Auth.context';
import AuthNavigation from './components/authNavigation/AuthNavigation.component';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthContextProvider>
      <PaperProvider theme={foresterPaperTheme}>
        <AuthNavigation />
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthContextProvider>
  );
}
