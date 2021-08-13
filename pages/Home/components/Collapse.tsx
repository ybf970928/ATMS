import {IconOutline} from '@ant-design/icons-react-native';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  // View,
  LayoutAnimation,
  Animated,
  // Easing,
} from 'react-native';

interface ICollapseTypes {
  title: string;
}

const Collapse: React.FC<ICollapseTypes> = ({children, title}) => {
  const [open, setOpen] = useState<boolean>(false);
  const height = open ? 'auto' : 0;
  // const opacity = new Animated.Value(0);

  const toggleBox = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
    );
    // open = !open;
    // opacity.setValue(open ? 0 : 1);
    // Animated.timing(opacity, {
    //   toValue: open ? 1 : 0,
    //   duration: 400,
    //   easing: Easing.linear,
    //   useNativeDriver: true,
    // }).start();
    setOpen(pre => !pre);
  };
  // const rotate = opacity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['270deg', '360deg'],
  // });
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.collapseHead}
        onPress={toggleBox}>
        <Text>{title}</Text>
        <Animated.View
          style={{
            transform: [{rotate: open ? '360deg' : '270deg'}],
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
