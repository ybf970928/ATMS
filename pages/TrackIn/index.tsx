import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, Input, Box} from 'native-base';
import BaseInfoTrackIn from './components/BaseInfo';
import {useForm, Controller} from 'react-hook-form';
import CardTable from './components/CardTable';
const TrackIn: React.FC = () => {
  const {control} = useForm();
  const [inputValue, setInputValue] = useState<string>('');
  const handleKeyDown = (value: string) => {
    setInputValue(value);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Box
        bg="white"
        maxWidth="100%"
        p={2}
        mt={2}
        rounded="lg"
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap">
        <Text style={styles.lotIdText}>作业批号: </Text>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              w={'80%'}
              onSubmitEditing={() => handleKeyDown(value)}
              multiline={true}
              blurOnSubmit={true}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="lotId"
        />
      </Box>
      <BaseInfoTrackIn lotId={inputValue} />
      <CardTable lotId={inputValue} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  lotIdText: {
    paddingRight: 8,
  },
});
export default TrackIn;
