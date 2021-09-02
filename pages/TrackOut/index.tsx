import React, {createContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import UserCard, {TrackOutProps} from './components/UserCard';
import Infos from './components/TheInfosTable';
import {useState} from 'react';

interface TrackOutContextProps {
  eqpInfo: TrackOutProps;
  toggleEqpInfo: (data: TrackOutProps) => void;
}
export const TrackOutContext = createContext<TrackOutContextProps>({
  eqpInfo: {},
  toggleEqpInfo: () => {},
});

const TrackOut: React.FC = () => {
  const [eqpInfo, setEqpInfo] = useState<TrackOutProps>({});

  return (
    <ScrollView style={styles.scrollView}>
      <TrackOutContext.Provider
        value={{
          eqpInfo: eqpInfo,
          toggleEqpInfo: (data: TrackOutProps) => {
            setEqpInfo(data);
          },
        }}>
        <UserCard />
        <Infos />
      </TrackOutContext.Provider>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
});
export default TrackOut;
