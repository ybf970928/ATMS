import React from 'react';
import {
  // Dimensions,
  // Animated,
  // Pressable,
  // StyleSheet,
  // View,
  UIManager,
  Platform,
  ScrollView,
} from 'react-native';
// import {TabView, SceneMap} from 'react-native-tab-view';
// import {Box} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import {headerStyle} from '../../layouts/AppTabs';
import MoreFeatures from './components/MoreFeatures';
import UserCard from './components/UserCard';
import MessageBox from './components/MessageBox';
// import Repair from './Repair';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// const initialLayout = {width: Dimensions.get('window').width};

const HomePage: React.FC = () => {
  // const [index, setIndex] = React.useState<number>(0);
  // const [routes] = React.useState([
  //   {key: 'Production', title: '生产管理'},
  //   {key: 'Repair', title: '报修管理'},
  // ]);

  // const renderScene = SceneMap({
  //   Production: Production,
  //   Repair: Repair,
  // });
  // const renderTabBar = (props: any) => {
  //   const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
  //   return (
  //     <Box flexDirection="row">
  //       {props.navigationState.routes.map(
  //         (route: {key: string; title: string}, i: number) => {
  //           const opacity = props.position.interpolate({
  //             inputRange,
  //             outputRange: inputRange.map((inputIndex: number) =>
  //               inputIndex === i ? 1 : 0.5,
  //             ),
  //           });

  //           return (
  //             <Box flex={1} alignItems="center" p={2} key={i}>
  //               <Pressable
  //                 style={styles.tabItem}
  //                 onPress={() => {
  //                   setIndex(i);
  //                 }}>
  //                 <Animated.Text
  //                   style={{opacity, textAlign: 'center'!, color: '#333'!}}>
  //                   {route.title}
  //                 </Animated.Text>
  //                 {i === index ? <View style={styles.line} /> : null}
  //               </Pressable>
  //             </Box>
  //           );
  //         },
  //       )}
  //     </Box>
  //   );
  // };
  return (
    // <TabView
    //   navigationState={{index, routes}}
    //   renderScene={renderScene}
    //   renderTabBar={renderTabBar}
    //   onIndexChange={setIndex}
    //   initialLayout={initialLayout}
    // />
    <ScrollView style={{flex: 1!}}>
      <UserCard />
      <MessageBox />
      <MoreFeatures />
    </ScrollView>
  );
};

const Home: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My"
        component={HomePage}
        options={{
          headerTitle: 'ATMS',
          headerTitleAlign: 'left',
          ...headerStyle,
        }}
      />
    </Stack.Navigator>
  );
};

// const styles = StyleSheet.create({
//   tabItem: {
//     width: '100%',
//     paddingVertical: 10,
//     position: 'relative',
//   },
//   line: {
//     position: 'absolute',
//     left: 0,
//     bottom: 0,
//     width: '100%',
//     height: 2,
//     borderRadius: 2,
//     backgroundColor: '#3b82f6',
//   },
// });
export default Home;
