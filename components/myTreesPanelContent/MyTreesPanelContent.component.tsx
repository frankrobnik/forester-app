import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SlidingUpHandle from '../slidingUpHandle/SlidingUpHandle.component';

const MyTreesPanelContent = () => {
  return (
    <View style={styles.container}>
      <SlidingUpHandle />
      <View>
        <Text>My trees panel</Text>
      </View>
    </View>
  );
};

export default MyTreesPanelContent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 64,
  },
});
