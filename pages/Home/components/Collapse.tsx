import {IconOutline} from '@ant-design/icons-react-native';
import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Animated,
  Easing,
} from 'react-native';

interface ICollapseTypes {
  title: string;
}

const Collapse: React.FC<ICollapseTypes> = ({children, title}) => {
  const [open, setOpen] = useState<boolean>(true);
  const height = open ? 'auto' : 0;
  const rotate = useRef<Animated.Value>(new Animated.Value(0)).current;

  const toggleBox = () => {
    setOpen(pre => !pre);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
    );
    Animated.timing(rotate, {
      toValue: open ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const rotateX = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '270deg'],
  });
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.collapseHead}
        onPress={toggleBox}>
        <Text>{title}</Text>
        <Animated.View
          style={{
            transform: [{rotate: rotateX}],
          }}>
          <IconOutline name="caret-down" size={24} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.collapseContent, {height: height}]}>
        {children}
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  collapseHead: {
    padding: 10,
    backgroundColor: '#d5dbe4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  collapseContent: {
    marginTop: 10,
    overflow: 'hidden',
  },
});

export default Collapse;
