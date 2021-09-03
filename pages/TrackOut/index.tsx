import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ActionTrackOut from './components/ActionTrackOut';

const TrackOut: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      <ActionTrackOut />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
});
export default TrackOut;
