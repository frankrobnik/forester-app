import React from 'react';
import { View } from 'react-native';

const SlidingUpHandle = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          marginVertical: 12,
          width: 48,
          height: 3,
          borderRadius: 3,
          backgroundColor: '#000000',
          opacity: 0.08,
        }}
      />
    </View>
  );
};

export default SlidingUpHandle;
