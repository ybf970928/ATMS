import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Pressable} from 'native-base';
import {IconOutline, OutlineGlyphMapType} from '@ant-design/icons-react-native';

interface IProps {
  title: string;
  iconName: OutlineGlyphMapType;
  showRightIcon?: boolean;
  onPress?: () => void;
}

export const Item: React.FC<IProps> = ({
  title,
  iconName,
  showRightIcon = true,
  onPress,
}) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <IconOutline name={iconName} size={20} />
      </View>
      <View style={styles.itemRight}>
        <Text>{title}</Text>
        {!!showRightIcon && <IconOutline name="right" size={20} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(221, 221, 221)',
  },
  itemLeft: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  itemRight: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
