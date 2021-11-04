import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import BottomTabs from '../../components/bottomTabs/BottomTabs.component';
import { Explorer } from '../explorer/Explorer.screen';
import BottomSheet from '@gorhom/bottom-sheet';
import { FAB } from 'react-native-paper';
import MyTreesPanelContent from '../../components/myTreesPanelContent/MyTreesPanelContent.component';
import ProfilePanelContent from '../../components/profilePanelContent/profilePanelContent.component';

export const MainApp = () => {
  const [mode, setMode] = useState<'explore' | 'myTrees' | 'profile' | 'tree' | 'newTree'>('explore');
  const myTreesRef = useRef<BottomSheet>(null);
  const profileRef = useRef<BottomSheet>(null);
  const treeRef = useRef<BottomSheet>(null);
  const newTreeRef = useRef<BottomSheet>(null);

  const changeInterface = function (action: 'explore' | 'myTrees' | 'profile' | 'tree' | 'newTree'): void {
    setMode(action);
    // close all bottomsheets
    if (action !== 'myTrees' && myTreesRef.current) myTreesRef.current.snapToIndex(0);
    if (action !== 'profile' && profileRef.current) profileRef.current.snapToIndex(0);
    if (action !== 'tree' && treeRef.current) treeRef.current.snapToIndex(0);
    if (action !== 'newTree' && newTreeRef.current) newTreeRef.current.snapToIndex(0);

    if (action === 'explore') {
      // reset map position and zoom level
    }
    if (action === 'myTrees') {
      if (myTreesRef.current) myTreesRef.current.snapToIndex(1);
    }
    if (action === 'profile') {
      if (profileRef.current) profileRef.current.snapToIndex(1);
    }
    if (action === 'tree') {
      if (treeRef.current) treeRef.current.snapToIndex(1);
    }
    if (action === 'newTree') {
      if (newTreeRef.current) newTreeRef.current.snapToIndex(1);
    }
  };

  const handleChange = function (index: number): void {
    if (index === 0) setMode('explore');
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Explorer />
        <FAB
          icon={'plus'}
          style={{ position: 'absolute', margin: 16, right: 0, bottom: 96 }}
          visible={mode === 'explore' ? true : false}
          onPress={() => changeInterface('newTree')}
        />
        <BottomSheet ref={myTreesRef} index={0} snapPoints={[44, '50%', '100%']} onChange={handleChange}>
          <MyTreesPanelContent />
        </BottomSheet>
        <BottomSheet ref={profileRef} index={0} snapPoints={[44, '50%', '100%']} onChange={handleChange}>
          <ProfilePanelContent bottomSheetRef={profileRef} />
        </BottomSheet>
        <BottomSheet ref={treeRef} index={0} snapPoints={[44, '50%', '100%']} onChange={handleChange}>
          <Text>single tree</Text>
        </BottomSheet>
        <BottomSheet ref={newTreeRef} index={0} snapPoints={[44, 240]} onChange={handleChange}>
          <Text>new tree</Text>
        </BottomSheet>
        <BottomTabs mode={mode} changeInterface={changeInterface} />
      </View>
    </>
  );
};
