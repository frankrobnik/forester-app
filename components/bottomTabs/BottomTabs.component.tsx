import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tab from '../tab/Tab.component';

interface Props {
  changeInterface: (action: 'explore' | 'myTrees' | 'profile' | 'tree' | 'newTree') => void;
  mode: 'explore' | 'myTrees' | 'profile' | 'tree' | 'newTree';
}

const BottomTabs = ({ changeInterface, mode }: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.tabContainer} edges={['right', 'bottom', 'left']}>
        <Tab name="Explore" icon="map-outline" active={mode === 'explore' ? true : false} onPress={() => changeInterface('explore')} />
        <Tab name="My Trees" icon="tree-outline" active={mode === 'myTrees' ? true : false} onPress={() => changeInterface('myTrees')} />
        <Tab name="Profile" icon="account-outline" active={mode === 'profile' ? true : false} onPress={() => changeInterface('profile')} />
      </SafeAreaView>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
