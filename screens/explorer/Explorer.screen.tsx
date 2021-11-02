import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  test: number;
}

export const Explorer = (props: Props) => {
  return (
    <View>
      <Text>Explorer Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
