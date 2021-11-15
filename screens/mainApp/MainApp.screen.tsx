import React, { Dispatch, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import BottomTabs from '../../components/bottomTabs/BottomTabs.component';
import { Explorer } from '../explorer/Explorer.screen';
import BottomSheet from '@gorhom/bottom-sheet';
import MyTreesPanelContent from '../../components/myTreesPanelContent/MyTreesPanelContent.component';
import ProfilePanelContent from '../../components/profilePanelContent/profilePanelContent.component';
import { navAction } from '../../types/navAction.type';
import { AuthAction } from '../../interfaces/authReducer/AuthReducer.interface';

interface Props {
  authDispatch: Dispatch<AuthAction>;
}

export const MainApp = ({ authDispatch }: Props) => {
  const [currentMode, setCurrentMode] = useState<navAction>('explore');
  const myTreesRef = useRef<BottomSheet>(null);
  const profileRef = useRef<BottomSheet>(null);
  const treeRef = useRef<BottomSheet>(null);
  const newTreeRef = useRef<BottomSheet>(null);

  const changeMode = function (action: navAction): void {
    setCurrentMode(action);
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

  const handleOnChange = function (index: number, compareMode: navAction) {
    if (currentMode === compareMode && index === 0) setCurrentMode('explore');
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Explorer currentMode={currentMode} changeMode={changeMode} />
        <BottomSheet ref={myTreesRef} index={0} snapPoints={[44, '50%', '100%']} onChange={(i) => handleOnChange(i, 'myTrees')}>
          <MyTreesPanelContent />
        </BottomSheet>
        <BottomSheet ref={profileRef} index={0} snapPoints={[44, '50%', '100%']} onChange={(i) => handleOnChange(i, 'profile')}>
          <ProfilePanelContent bottomSheetRef={profileRef} authDispatch={authDispatch} />
        </BottomSheet>
        <BottomSheet ref={treeRef} index={0} snapPoints={[44, '50%', '100%']} onChange={(i) => handleOnChange(i, 'tree')}>
          <Text>single tree</Text>
        </BottomSheet>
        <BottomSheet ref={newTreeRef} index={0} snapPoints={[44, 240]} onChange={(i) => handleOnChange(i, 'newTree')}>
          <Text>new tree</Text>
        </BottomSheet>
        <BottomTabs currentMode={currentMode} changeMode={changeMode} />
      </View>
    </>
  );
};
