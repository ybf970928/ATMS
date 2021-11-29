import React, {useEffect, useRef, useState} from 'react';
import {
  // Text,
  ScrollView,
  View,
  StyleSheet,
  Animated,
  Easing,
  // LayoutAnimation,
} from 'react-native';
import {Text} from 'native-base';

import useWebSocket from '../../../hooks/useWebSocket';
import {parseTime} from '../../../utils/parseTime';

type SocketType = {
  eqpId: string;
  functionName: string;
  body: {
    message?: string;
    type?: string;
    action?: string;
    status?: string;
  };
};

type MessageType = {
  date: string;
  message: string;
  type: string;
};

const ITEM_H = 40; // 每项的高度

const Item = ({item}: {item: MessageType}) => {
  return (
    <View style={styles.messageItem}>
      <Text style={styles.messageDate}>{item.date}</Text>
      <Text style={styles.messageTitle} noOfLines={1}>
        {item.message}
      </Text>
    </View>
  );
};

const MessageBox: React.FC = () => {
  const {latestMessage, readyState} = useWebSocket('ws://192.168.20.12:8070');
  const [scrollMessage, setScrollMessage] = useState<MessageType[]>([]);
  const savedCallback = useRef<() => void>(() => {});
  const translateY = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    if (readyState === 1) {
      if (!latestMessage) {
        return;
      }
      const {functionName, body} = latestMessage as SocketType;
      if (functionName === 'EAPToOUI_ShowUIMessage') {
        const msgItem: MessageType = {
          type: body.type!,
          message: body.message!,
          date: parseTime(new Date().getTime())!,
        };
        setScrollMessage(preState => [...preState, msgItem]);
      }
    }
  }, [latestMessage, readyState]);

  const autoScrollY = () => {
    if (scrollMessage.length > 5) {
      Animated.timing(translateY, {
        toValue: -40,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setScrollMessage(scrollMessage.concat(scrollMessage[0]).slice(1));
        Animated.timing(translateY, {
          toValue: 0,
          duration: 0,
          delay: 0,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  useEffect(() => {
    savedCallback.current = autoScrollY;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView scrollEnabled={false} style={styles.messageBox}>
      <View style={styles.translateBox}>
        <Animated.View
          style={{
            transform: [{translateY: translateY}],
          }}>
          {scrollMessage.map((item, index) => (
            <Item item={item} key={index} />
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
    paddingHorizontal: 10,
  },
  messageItem: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageDate: {
    height: ITEM_H,
    width: '30%',
    lineHeight: ITEM_H,
    textAlign: 'left',
  },
  messageTitle: {
    width: '70%',
    height: ITEM_H,
    lineHeight: ITEM_H,
    textAlign: 'right',
  },
});
export default MessageBox;
