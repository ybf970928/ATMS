import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Input} from 'native-base';
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
      <View style={styles.cardHead}>
        <View style={styles.materialsTitle}>
          <Text>作业批号: </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                w={180}
                h={10}
                onSubmitEditing={() => handleKeyDown(value)}
                multiline={true}
                blurOnSubmit={true}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="lotId"
          />
        </View>
      </View>
      <BaseInfoTrackIn lotId={inputValue} />
      <CardTable lotId={inputValue} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  cardHead: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  materialsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    color: '#3b82f6',
  },
});
export default TrackIn;
