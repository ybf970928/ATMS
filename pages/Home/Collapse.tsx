import {IconOutline} from '@ant-design/icons-react-native';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  LayoutAnimation,
} from 'react-native';

const Collapse: React.FC = ({children}) => {
  const [open, setOpen] = useState<boolean>(false);
  const height = open ? 'auto' : 0;
  const toggleBox = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(400, 'easeInEaseOut', 'opacity'),
    );
    setOpen(pre => !pre);
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.collapseHead}
        onPress={toggleBox}>
        <Text>更多功能</Text>
        <View
          style={{
            transform: [{rotate: open ? '180deg' : '0deg'}],
          }}>
          <IconOutline name="caret-down" size={24} />
        </View>
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
