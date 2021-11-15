import BottomSheet from '@gorhom/bottom-sheet';
import React, { Dispatch } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { AuthAction } from '../../interfaces/authReducer/AuthReducer.interface';

interface Props {
  bottomSheetRef: React.RefObject<BottomSheet>;
  authDispatch: Dispatch<AuthAction>;
}

const ProfilePanelContent = ({ bottomSheetRef, authDispatch }: Props) => {
  const handleSignOut = function () {
    authDispatch({ type: 'SIGN_OUT' });
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon={'dots-vertical'}
        size={20}
        style={{ position: 'absolute', top: 0, right: 0, margin: 16 }}
        onPress={() => bottomSheetRef?.current?.snapToIndex(2)}
      />
      <Text>user profile</Text>
      <Button onPress={handleSignOut}>logout</Button>
    </View>
  );
};

export default ProfilePanelContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
