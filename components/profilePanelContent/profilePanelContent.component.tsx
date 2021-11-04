import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const ProfilePanelContent = ({ bottomSheetRef }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={'dots-vertical'}
        size={20}
        style={{ position: 'absolute', top: 0, right: 0, margin: 16 }}
        onPress={() => bottomSheetRef?.current?.snapToIndex(2)}
      />
      <Text></Text>
    </View>
  );
};

export default ProfilePanelContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
