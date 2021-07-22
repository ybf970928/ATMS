import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import ValidateAlert from '../../components/ValidateAlert';
import BaseInfoTable from './components/BaseInfoTable';
export interface TrackinFormProps {
  handleId?: string;
  testerId?: string;
}
const TrackOut: React.FC = () => {
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
        <ValidateAlert formRoute="TrackOut" Keyword="handleId" />
      ) : (
        <ScrollView style={styles.scrollView}>
          <BaseInfoTable />
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
export default TrackOut;
