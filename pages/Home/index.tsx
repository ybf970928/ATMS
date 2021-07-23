import React from 'react';
import {
  Dimensions,
  Animated,
  Pressable,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {IconOutline, OutlineGlyphMapType} from '@ant-design/icons-react-native';
import {Box} from 'native-base';
import {useNavigation, StackActions} from '@react-navigation/native';
import {AuthContext} from '../../layouts/AuthProvider';

const initialLayout = {width: Dimensions.get('window').width};

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'ProductionManagement', title: '生产管理'},
    {key: 'RepairManagement', title: '报修管理'},
  ]);
  const {logout} = React.useContext(AuthContext);
  const ProductionProjects = () => {
    const ProductionRoutes: {
      title: string;
      icon: OutlineGlyphMapType;
      route: string;
    }[] = [
      {title: '开批', icon: 'fork', route: 'TrackIn'},
      {title: '保存summary', icon: 'cloud-upload', route: 'SaveSummary'},
      {title: '结批', icon: 'stop', route: 'TrackOut'},
      {title: '交接班', icon: 'usergroup-add', route: 'Handover'},
      {title: '更换socket', icon: 'setting', route: 'ReplaceScoket'},
      {title: '材料上机', icon: 'mac-command', route: 'OnMachine'},
    ];
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {ProductionRoutes.map((node, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.productionRoutesItem}
                onPress={() =>
                  navigation.dispatch(StackActions.push(node.route))
                }>
                <IconOutline name={node.icon} size={26} />
                <Text>{node.title}</Text>
              </TouchableOpacity>
            );
          })}
          {/* 保证space-between；最后一行靠左对齐 */}
          {ProductionRoutes.map(item => {
            return <View style={styles.placeholderItem} key={item.route} />;
          })}
        </View>
      </ScrollView>
    );
  };

  const SecondRoute = () => <Button title={'退出登陆'} onPress={logout} />;

  const renderScene = SceneMap({
    ProductionManagement: ProductionProjects,
    RepairManagement: SecondRoute,
  });
  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map(
          (route: {key: string; title: string}, i: number) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex: number) =>
                inputIndex === i ? 1 : 0.5,
              ),
            });

            return (
              // bg={'#3b82f6'}
              <Box flex={1} alignItems="center" p={2} key={i}>
                <Pressable
                  style={styles.tabItem}
                  onPress={() => {
                    setIndex(i);
                  }}>
                  <Animated.Text
                    style={{opacity, textAlign: 'center'!, color: '#333'!}}>
                    {route.title}
                  </Animated.Text>
                  {i === index ? <View style={styles.line} /> : null}
                </Pressable>
              </Box>
            );
          },
        )}
      </Box>
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productionRoutesItem: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderItem: {
    width: 150,
  },
  tabItem: {
    width: '100%',
    paddingVertical: 10,
    position: 'relative',
  },
  line: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 2,
    borderRadius: 2,
    backgroundColor: '#3b82f6',
  },
});
export default Home;
