import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import TableV2 from '../../../components/TableV2';
import {IColProps} from '../../../types/Table';
import {getYieldInfo} from '../../../services/trackOut';
import {getLotId, getUserInfo} from '../../../utils/user';
import {FormControl, Input, HStack} from 'native-base';
import {TrackOutContext} from '../index';

interface yieldProps {
  trOperID: string;
  testedQty: string;
  quotaCode: string;
}

// 材料信息
const yieldColumns: IColProps<yieldProps>[] = [
  {title: '作业员', dataIndex: 'trOperID'},
  {title: '作业数量', dataIndex: 'testedQty'},
  {title: '定额代码', dataIndex: 'quotaCode'},
];

const YieldBox: React.FC = () => {
  const [yieldlSource, setYieldSource] = useState<yieldProps[]>([]);
  const {eqpInfo} = useContext(TrackOutContext);
  useEffect(() => {
    const getList = async () => {
      const {eqpid} = await getUserInfo();
      const currentLotId = await getLotId();
      const yieldList = await getYieldInfo({
        eqpId: eqpid,
        lotId: currentLotId!,
      });
      setYieldSource(yieldList.data);
    };
    getList();
  }, []);

  return (
    <>
      {/* <Text>填写当前作业数量</Text> */}
      <HStack space={3} alignItems="center" mb={6}>
        <FormControl style={styles.formItem}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            作业员
          </FormControl.Label>
          <Input h={10} isDisabled value={eqpInfo.operId} />
        </FormControl>
        <FormControl style={styles.formItem}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            作业数量
          </FormControl.Label>
          <Input h={10} />
        </FormControl>
        <FormControl style={styles.formItem}>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
            定额代码
          </FormControl.Label>
          <Input h={10} isDisabled value={eqpInfo.quotaCode} />
        </FormControl>
      </HStack>
      <TableV2 dataSource={yieldlSource} columns={yieldColumns} />
    </>
  );
};

const styles = StyleSheet.create({
  formItem: {
    width: '30%',
  },
});

export default React.memo(YieldBox);
