import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import UserCard from './components/UserCard';
import Infos from './components/TheInfosTable';
const TrackOut: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <UserCard />
      <Infos />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
});
export default TrackOut;
