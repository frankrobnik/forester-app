import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Explorer = () => {
  return (
    <View style={styles.container}>
      <Text>Explorer Screen</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DC027',
  },
});
