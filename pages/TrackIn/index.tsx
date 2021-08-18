import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import BaseInfoTrackIn from './components/BaseInfo';
import CardTable from './components/CardTable';

export interface TrackinFormProps {
  handleId?: string;
  testerId?: string;
}

const TrackIn: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <BaseInfoTrackIn />
      <CardTable />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
});
export default TrackIn;
