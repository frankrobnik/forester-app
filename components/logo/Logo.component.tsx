import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
  return <Image source={require('../../assets/logo.png')} style={styles.logo} />;
};

export default Logo;

const styles = StyleSheet.create({
  logo: { height: 32, width: 138, marginVertical: 16 },
});
