import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import BottomTabs from '../../components/bottomTabs/BottomTabs.component';
import { Explorer } from '../explorer/Explorer.screen';
import SlidingUpPanel from 'rn-sliding-up-panel';

export const MainApp = () => {
  const { height } = Dimensions.get('window');
  const myTreesPanelRef = useRef<SlidingUpPanel>(null);

  const navigateToMyTrees = function (): void {
    if (myTreesPanelRef?.current) {
      myTreesPanelRef.current.show(height / 2);
    }
  };

  return (
    <>
      <Explorer test={0} />
      <SlidingUpPanel
        ref={myTreesPanelRef}
        draggableRange={{ top: height, bottom: 0 }}
        snappingPoints={[height / 2, height]}
        showBackdrop={false}
        containerStyle={styles.panel}>
        <View></View>
        {/* <MyTreesPanelContent /> */}
      </SlidingUpPanel>
      <BottomTabs onPressMyTrees={navigateToMyTrees} />
    </>
  );
};

const styles = StyleSheet.create({
  panel: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#e9e9e9',
    zIndex: 50,
    position: 'relative',
    shadowRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
  },
});
