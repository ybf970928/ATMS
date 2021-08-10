import React from 'react';
import {StyleSheet, Text, Alert} from 'react-native';
import {Pressable} from 'native-base';
import {IconOutline} from '@ant-design/icons-react-native';

interface IProps {
  title: string;
  onPress?: () => void;
}

export const Item: React.FC<IProps> = ({title}) => {
  return (
    <Pressable
      style={styles.item}
      onPress={() => Alert.alert('do somethings...')}>
      <Text>{title}</Text>
      <IconOutline name="right" size={20} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
