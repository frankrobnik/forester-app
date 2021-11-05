import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomTabs from '../../components/bottomTabs/BottomTabs.component';
import BottomSheet from '@gorhom/bottom-sheet';
import MyTreesPanelContent from '../../components/myTreesPanelContent/MyTreesPanelContent.component';
import ProfilePanelContent from '../../components/profilePanelContent/profilePanelContent.component';
import { navAction } from '../../types/navAction.type';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import googleMapsStyle from '../../utils/googleMapsStyle.json';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewTreePanelContent from '../../components/NewTreePanelContent/NewTreePanelContent';

export const MainApp = () => {
  const [currentMode, setCurrentMode] = useState<navAction>('explore');
  const myTreesRef = useRef<BottomSheet>(null);
  const profileRef = useRef<BottomSheet>(null);
  const treeRef = useRef<BottomSheet>(null);
  const newTreeRef = useRef<BottomSheet>(null);
  const [location, setLocation] = useState({ latitude: 52.52, longitude: 13.405, latitudeDelta: 0.2, longitudeDelta: 0.2 });
  const [pin, setPin] = useState({ latitude: 52.52, longitude: 13.405 });
  const [displayPin, setDisplayPin] = useState<boolean>(false);
  const [treeName, setTreeName] = useState<string>('');

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
  const getLocation = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('not granted');
      }
      const locations = await watchPositionAsync({ accuracy: Accuracy.High, timeInterval: 10000, distanceInterval: 1 }, (loc) => {
        const { latitude, longitude } = loc.coords;
        setLocation({ latitude: latitude, longitude: longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callee();
  }, []);
  const callee = async () => {
    await getLocation();
  };

  const handleOnChange = function (index: number, compareMode: navAction) {
    if (currentMode === compareMode && index === 0) setCurrentMode('explore');
  };
  const handleButtonPressed = () => {
    changeMode('newTree');
    setDisplayPin(true);
    setPin({ latitude: location.latitude, longitude: location.longitude });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={googleMapsStyle}
          minZoomLevel={13}
          maxZoomLevel={18}
          rotateEnabled={false}>
          {displayPin && (
            <Marker
              draggable
              coordinate={pin}
              image={require('../../assets/user-pin.png')}
              title="test-titble"
              onCalloutPress={() => alert('Clicked')}
              onDragEnd={(e) => setPin({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}></Marker>
          )}
        </MapView>
        <SafeAreaView style={{ position: 'absolute', bottom: 64, right: 0 }}>
          <FAB icon={'plus'} style={{ margin: 16 }} visible={currentMode === 'explore' ? true : false} onPress={() => handleButtonPressed()} />
        </SafeAreaView>
        <BottomSheet ref={myTreesRef} index={0} snapPoints={[44, '50%', '100%']} onChange={(i) => handleOnChange(i, 'myTrees')}>
          <MyTreesPanelContent />
        </BottomSheet>
        <BottomSheet ref={profileRef} index={0} snapPoints={[44, '50%', '100%']} onChange={(i) => handleOnChange(i, 'profile')}>
          <ProfilePanelContent bottomSheetRef={profileRef} />
        </BottomSheet>
        <BottomSheet ref={treeRef} index={0} snapPoints={[44, '50%', '100%']} onChange={(i) => handleOnChange(i, 'tree')}>
          <Text>single tree</Text>
        </BottomSheet>
        <BottomSheet ref={newTreeRef} index={0} snapPoints={[44, 240]} onChange={(i) => handleOnChange(i, 'newTree')}>
          <NewTreePanelContent setTreeName={setTreeName} />
        </BottomSheet>
        <BottomTabs currentMode={currentMode} changeMode={changeMode} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
