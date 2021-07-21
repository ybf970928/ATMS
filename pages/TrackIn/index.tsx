import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import BaseInfoTrackIn from './components/BaseInfo';
import MaterialInfoTrackIn from './components/MaterialInfo';
const TrackIn: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <BaseInfoTrackIn />
      <MaterialInfoTrackIn />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
});
export default TrackIn;
