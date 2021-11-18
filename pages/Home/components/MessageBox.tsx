import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Animated,
  // LayoutAnimation,
} from 'react-native';
import useWebSocket from '../../../hooks/useWebSocket';

type MessageType = {
  id: string;
  title: string;
  flag: 0 | 1;
};

const ITEM_H = 40; // 每项的高度

const Item = ({title}: {title: string}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const MessageBox: React.FC = () => {
  const {latestMessage, readyState} = useWebSocket('ws://localhost:8000');
  const [scrollMessage, setScrollMessage] = useState<MessageType[]>([]);
  const savedCallback = useRef<() => void>(() => {});
  const translateValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    if (readyState === 1) {
      setScrollMessage(latestMessage);
    }
  }, [latestMessage, readyState]);

  // const startAnimated = useCallback(() => {
  //   if (socketMessage.length <= SHOWSIZE) {
  //     return;
  //   }
  //   if (count.current === socketMessage.length - SHOWSIZE) {
  //     count.current = 0;
  //   } else {
  //     count.current++;
  //   }
  //   console.log('count数: ', count.current, '信息长度:', socketMessage.length);

  // Animated.timing(translateValue, {
  //   toValue: -(count.current * ITEM_H),
  //   duration: 1500,
  //   delay: 1500,
  //   easing: Easing.linear,
  //   useNativeDriver: true,
  // }).start(() => {
  //   // if (!stopAnimation) {
  //   startAnimated();
  //   // }
  // });
  // }, [socketMessage, translateValue]);
  const autoScrollY = () => {
    if (scrollMessage.length) {
      const arr = [...scrollMessage];
      arr.concat(scrollMessage[0]).slice(1);
    }
    // LayoutAnimation.configureNext(
    //   LayoutAnimation.create(
    //     200,
    //     LayoutAnimation.Types.easeInEaseOut,
    //     LayoutAnimation.Properties.scaleX,
    //   ),
    // );
  };

  useEffect(() => {
    savedCallback.current = autoScrollY;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView scrollEnabled={false} style={styles.messageBox}>
      <View style={styles.translateBox}>
        <Animated.View
          style={{
            transform: [{translateY: translateValue}],
          }}>
          {scrollMessage.map(item => (
            <Item title={item.title} key={item.id} />
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
    height: ITEM_H,
    lineHeight: ITEM_H,
  },
});
export default MessageBox;
