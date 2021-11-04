import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  name: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

const Tab = ({ name, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  tab: { paddingVertical: 12, flex: 1, justifyContent: 'center', alignItems: 'center' },
});
