import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tab from '../tab/Tab.component';
import { navAction } from '../../types/navAction.type';
interface Props {
  changeMode: (action: navAction) => void;
  currentMode: navAction;
}

const BottomTabs = ({ changeMode, currentMode }: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.tabContainer} edges={['right', 'bottom', 'left']}>
        <Tab name="Explore" icon="map-outline" active={currentMode === 'explore' ? true : false} onPress={() => changeMode('explore')} />
        <Tab name="My Trees" icon="tree-outline" active={currentMode === 'myTrees' ? true : false} onPress={() => changeMode('myTrees')} />
        <Tab name="Profile" icon="account-outline" active={currentMode === 'profile' ? true : false} onPress={() => changeMode('profile')} />
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
