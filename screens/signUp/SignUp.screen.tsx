import React, { useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Paragraph, Snackbar, TextInput, useTheme } from 'react-native-paper';
import { navStackParamList } from '../../types/navStackParamList.type';
import { useToggle } from '../../hooks/useToggle/useToggle.hook';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validateInput.util';
import Logo from '../../components/logo/Logo.component';
import forester from '../../services/forester.service';
import { AuthResponse } from '../../interfaces/authResponse/AuthResponse.interface';
import { AuthContext } from '../../context/Auth.context';

type Props = NativeStackScreenProps<navStackParamList, 'SignIn'>;

const SignUp = ({ navigation }: Props) => {
  const authContext = useContext(AuthContext);
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, togglePasswordHidden] = useToggle(true);
  const togglePassword = <TextInput.Icon name={passwordHidden ? 'eye' : 'eye-off'} onPress={togglePasswordHidden} />;
  const [validForm, setValidForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorIsVissible, setErrorIsVisible] = useState(false);

  useEffect(() => {
    if (username !== '' && email !== '' && password !== '') setValidForm(true);
    else if (validForm) setValidForm(false);
  }, [username, email, password]);

  const handlePressRegister = async () => {
    try {
      validateUsername(username);
      validateEmail(email);
      validatePassword(password);
      const response: AuthResponse = await forester.register({ username, email, password });
      if (!response.accessToken) {
        throw new Error(`Sorry, we are having trouble connecting to our server. Please try again in a few minutes.`);
      } else {
        // TODO: userContext save user data (AuthResponse {username, email, experience})
        authContext?.signIn(response.accessToken);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
        setErrorIsVisible(true);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.container, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Logo />
          <View style={styles.text}>
            <Paragraph>Sign up to create a new account.</Paragraph>
          </View>
          <TextInput mode={'outlined'} label={'username'} value={username} onChangeText={setUsername} style={styles.input} />
          <TextInput mode={'outlined'} label={'email'} value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput
            mode={'outlined'}
            label={'password'}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={passwordHidden}
            right={togglePassword}
          />
          <Button mode="contained" onPress={handlePressRegister} disabled={!validForm} style={styles.register}>
            sign up
          </Button>
          <Button icon={'arrow-left'} onPress={() => navigation.goBack()} style={styles.goBack}>
            back to login
          </Button>
        </ScrollView>
        <Snackbar onDismiss={() => setErrorIsVisible(false)} visible={errorIsVissible} duration={5000}>
          {errorMessage}
        </Snackbar>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
  safeAreaView: { flex: 1 },
  scrollView: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 56 },
  input: { marginVertical: 6 },
  text: { marginBottom: 10 },
  register: { alignSelf: 'flex-start', marginVertical: 8 },
  goBack: { position: 'absolute', bottom: 0, left: 0, margin: 16 },
});
