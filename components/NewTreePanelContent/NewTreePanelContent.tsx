import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  setTreeName: React.Dispatch<React.SetStateAction<string>>;
}

const NewTreePanelContent = ({ setTreeName }: Props) => {
  console.log(setTreeName);
  return (
    <View>
      <Text>Add new tree</Text>
      <Text>name</Text>
      <TextInput onChangeText={setTreeName} placeholder="Enter the name of your tree" style={styles.input} />
      <Button>Cancel</Button>
      <Button>Save</Button>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
});

export default NewTreePanelContent;
