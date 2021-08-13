import {IconOutline, OutlineGlyphMapType} from '@ant-design/icons-react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import Collapse from './Collapse';
const MoreFeatures: React.FC = () => {
  const navigation = useNavigation();
  const ProductionRoutes: {
    title: string;
    icon: OutlineGlyphMapType;
    route: string;
  }[] = [
    {title: '工艺卡片', icon: 'idcard', route: 'CraftCard'},
    {title: 'OEE切换', icon: 'one-to-one', route: 'ChangeOEE'},
    {title: '作业中止', icon: 'stop', route: 'zuoye'},
    {title: '换劈刀', icon: 'trademark-circle', route: 'pidao'},
    {title: '换导丝管', icon: 'sync', route: 'daosi'},

    {title: '开批', icon: 'fork', route: 'TrackIn'},
    {title: '结批', icon: 'stop', route: 'TrackOut'},
    {title: '物料对比', icon: 'mac-command', route: 'wuliao'},
    {title: '产量交班', icon: 'usergroup-add', route: 'Handover'},
    {title: 'RMS', icon: 'sort-descending', route: 'RMS'},
    // {title: '保存summary', icon: 'cloud-upload', route: 'SaveSummary'},
    // {title: '交接班', icon: 'usergroup-add', route: 'Handover'},
    // {title: '更换socket', icon: 'setting', route: 'ReplaceScoket'},
    // {title: '材料上机', icon: 'mac-command', route: 'OnMachine'},
  ];
  return (
    <View style={styles.scrollView}>
      <Collapse title="更多功能">
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
      </Collapse>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10,
  },
  container: {
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
    width: 100,
  },
});

export default MoreFeatures;
