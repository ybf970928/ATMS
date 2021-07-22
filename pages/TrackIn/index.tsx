import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import BaseInfoTrackIn from './components/BaseInfo';
import MaterialInfoTrackIn from './components/MaterialInfo';
import HandleIdAlert from './components/HandleIdAlert';
import {useIsFocused, useRoute} from '@react-navigation/native';

export interface TrackinFormProps {
  handleId?: string;
  testerId?: string;
}

const TrackIn: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [formValue, setFormValue] = useState<TrackinFormProps>({});
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setFormValue({
          ...formValue,
          ...route.params,
        });
        setIsOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, route.params]);
  return (
    <>
      {isOpen ? (
        <HandleIdAlert />
      ) : (
        <ScrollView style={styles.scrollView}>
          <BaseInfoTrackIn form={formValue} setFormValue={setFormValue} />
          <MaterialInfoTrackIn />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
});
export default TrackIn;
