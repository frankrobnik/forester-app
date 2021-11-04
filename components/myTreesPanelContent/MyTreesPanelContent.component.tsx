import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MyTreesPanelContent = () => {
  return (
    <View style={styles.container}>
      <Text>My trees panel</Text>
    </View>
  );
};

export default MyTreesPanelContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
