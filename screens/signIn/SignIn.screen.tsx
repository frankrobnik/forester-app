import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, useTheme, TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/logo/Logo.component';
import { useToggle } from '../../hooks/useToggle/useToggle.hook';
import forester from '../../services/forester.service';
import { navStackParamList } from '../../types/navStackParamList.type';
import { AuthResponse } from '../../interfaces/authResponse/AuthResponse.interface';
import { AuthContext } from '../../context/Auth.context';

type Props = NativeStackScreenProps<navStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const authContext = useContext(AuthContext);
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, togglePasswordHidden] = useToggle(true);
  const showHidePassword = <TextInput.Icon name={passwordHidden ? 'eye' : 'eye-off'} onPress={togglePasswordHidden} />;
  const [errorMessage, setErrorMessage] = useState('');
  const [errorIsVisible, setErrorIsVissible] = useState(false);

  const handleSignIn = async () => {
    try {
      const response: AuthResponse = await forester.login({ email, password });
      if (!response.accessToken) {
        throw new Error('Email or password is incorrect.');
      } else {
        // TODO: userContext save user data (AuthResponse {username, email, experience})
        authContext?.signIn(response.accessToken);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
        setErrorIsVissible(true);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.container, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Logo />
          <TextInput mode="outlined" label="email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput
            mode="outlined"
            label="password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={passwordHidden}
            right={showHidePassword}
          />
          <Button mode="contained" disabled={email === '' || password === '' ? true : false} onPress={handleSignIn} style={styles.login}>
            Login
          </Button>
          <Button icon="arrow-right" onPress={() => navigation.navigate('SignUp')} style={styles.signUp}>
            sign up
          </Button>
          <Snackbar onDismiss={() => setErrorIsVissible(false)} visible={errorIsVisible} duration={5000}>
            {errorMessage}
          </Snackbar>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
  safeAreaView: { flex: 1 },
  scrollView: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 56 },
  input: { marginVertical: 6 },
  login: { alignSelf: 'flex-start', marginVertical: 8 },
  signUp: { position: 'absolute', bottom: 0, right: 0, margin: 16 },
});
