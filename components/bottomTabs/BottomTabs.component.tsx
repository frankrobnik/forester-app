import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tab from '../tab/Tab.component';

const { width } = Dimensions.get('window');

interface Props {
  onPressMyTrees: () => void;
}

const BottomTabs = ({ onPressMyTrees }: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.tabContainer} edges={['right', 'bottom', 'left']}>
        <Tab
          name="Explore"
          icon="explore-icon"
          active={true}
          onPress={() => {
            console.log('explore');
          }}
        />
        <Tab name="My Trees" icon="trees-icon" active={false} onPress={onPressMyTrees} />
        <Tab
          name="Profile"
          icon="profile-icon"
          active={false}
          onPress={() => {
            console.log('profile');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    zIndex: 100,
    bottom: 0,
    position: 'absolute',
    width: width,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
