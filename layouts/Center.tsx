import React from 'react';
import {StyleSheet, View} from 'react-native';
export const Center: React.FC = ({children}) => {
  return <View style={styles.content}>{children}</View>;
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
