import {IconOutline} from '@ant-design/icons-react-native';
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  LayoutAnimation,
  Animated,
} from 'react-native';

const Collapse: React.FC = ({children}) => {
  const [open, setOpen] = useState<boolean>(false);
  const fadeAnim = new Animated.Value(open ? 1 : 0);
  const height = open ? 'auto' : 0;
  const toggleBox = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(400, 'easeInEaseOut', 'opacity'),
    );
    setOpen(pre => !pre);
  };
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: open ? 0 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.collapseHead}
        onPress={toggleBox}>
        <Text>更多功能</Text>
        <Animated.View
          style={{
            transform: [{rotate: spin}],
          }}>
          <IconOutline name="caret-down" size={24} />
        </Animated.View>
      </TouchableOpacity>
      <View style={[styles.collapseContent, {height}]}>{children}</View>
    </>
  );
};
const styles = StyleSheet.create({
  collapseHead: {
    padding: 10,
    flex: 1,
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
