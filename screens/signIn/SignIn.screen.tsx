import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, useTheme, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/logo/Logo.component';
import { useToggle } from '../../hooks/useToggle/useToggle.hook';
import { navStackParamList } from '../../types/navStackParamList.type';

type Props = NativeStackScreenProps<navStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, togglePasswordHidden] = useToggle(true);

  const showHidePassword = <TextInput.Icon name={passwordHidden ? 'eye' : 'eye-off'} onPress={togglePasswordHidden} />;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.container, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Logo />
          <TextInput mode="outlined" label="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={passwordHidden}
            right={showHidePassword}
          />
          <Button mode="contained" disabled={email === '' || password === '' ? true : false} style={styles.login}>
            Login
          </Button>
          <Button icon="arrow-right" onPress={() => navigation.navigate('SignUp')} style={styles.signUp}>
            sign up
          </Button>
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
