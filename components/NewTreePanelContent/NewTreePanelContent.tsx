import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const NewTreePanelContent = ({ setTreeName }) => {
  return (
    <View>
      <Text>Add new tree</Text>
      <Text>name</Text>
      <Button>Cancel</Button>
      <Button>Save</Button>
    </View>
  );
};
export default NewTreePanelContent;
