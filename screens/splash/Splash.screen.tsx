import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Splash = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    height: 32,
    width: 138,
    margin: 24,
    alignSelf: 'center',
  },
});
