import React, {useEffect, useCallback, useRef} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

const SHOWSIZE = 5;
const ITEMH = 40;

const Item = ({title}: {title: string}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const MessageBox: React.FC = () => {
  const count = useRef<number>(0);
  const translateValue = useRef(new Animated.Value(0)).current;
  const DATA: {id: string; title: string}[] = [
    {id: 'bd7acbea-aed5-3ad53abb28ba', title: 'First Item'},
    {id: '3ac68afc-a4f8-fbd91aa97f63', title: 'Second Item'},
    {id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item'},
    {id: '58694a0f-c1b1-46c2-bd96-145571e29d72', title: 'Four Item'},
    {id: '58694a0f-c605-48d3-bd96-145571e29d72', title: 'Five Item'},
    {id: '58694a0f1f-bd96-145571e29d72', title: 'Six Item'},
    {id: '58694a0f-45571e29d72', title: 'Ten1 Item'},
    {id: '58694a0f-45571e2qwtrv9d72', title: 'Ten2 Item'},
    {id: '58694a0f-dsada', title: 'Ten3 Item'},
    {id: '58694a0f-dsdsa', title: 'Ten4 Item'},
    {id: '58694a0f-4557fr1e29d72', title: 'Ten5 Item'},
    {id: '58694a0f-455wre71e29d72', title: 'Ten6 Item'},
    {id: '58694a0f-45571e29d72qeew', title: 'Ten7 Item'},
  ];
  const startAnimated = useCallback(() => {
    if (DATA.length <= SHOWSIZE) {
      return;
    }
    if (count.current === DATA.length - SHOWSIZE) {
      count.current = 0;
    } else {
      count.current++;
    }
    Animated.timing(translateValue, {
      toValue: count.current * -ITEMH,
      duration: 1500,
      delay: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // if (!stopAnimation) {
      startAnimated();
      // }
    });
  }, [DATA.length, translateValue]);

  useEffect(() => {
    startAnimated();
  }, [startAnimated]);
  return (
    <ScrollView scrollEnabled={false} style={styles.messageBox}>
      <View style={styles.translateBox}>
        <Animated.View
          style={{
            transform: [{translateY: translateValue}],
          }}>
          {DATA.map((item, index) => (
            <Item title={item.title} key={index} />
          ))}
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    paddingHorizontal: 10,
  },
  translateBox: {
    height: 200,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
  },
  item: {
    marginHorizontal: 10,
  },
  title: {
    height: ITEMH,
    lineHeight: ITEMH,
  },
});
export default MessageBox;
