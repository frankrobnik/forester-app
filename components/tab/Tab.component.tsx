import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  name: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

const Tab = ({ name, icon, onPress, active }: Props) => {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={'black'} />
      <Text style={{ height: 20, lineHeight: 20, fontWeight: active ? 'bold' : 'normal' }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  tab: { paddingVertical: 12, flex: 1, justifyContent: 'center', alignItems: 'center' },
});
