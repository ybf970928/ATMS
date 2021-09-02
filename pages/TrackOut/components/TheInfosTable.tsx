import React, {useRef} from 'react';
import {Box, Heading, Button, HStack} from 'native-base';
import Scrap, {scrapProps} from './Scrap';
import InfosTable from './InfosTable';
import AutoInputs from '../../../components/AutoInputs';
import YieldBox from './YieldBox';
// import {doTrackOut} from '../../../services/trackOut';
const CardTable: React.FC = () => {
  const scrapRef = useRef<{state: scrapProps[]}>(null);
  const defectiveRef = useRef<{state: scrapProps[]}>(null);
  const autoInputRef = useRef<{values: String[]}>(null);

  const handleTrackIn = async () => {
    console.log(scrapRef?.current?.state);
    const obj = {
      scrapList: scrapRef.current?.state,
      defectiveList: defectiveRef.current?.state,
      boxs: autoInputRef.current?.values.join(','),
    };
    console.log(obj);
    // doTrackOut({
    //   scrapList: scrapRef.current.state
    // })
  };

  return (
    <>
      <Box bg="white" rounded="lg" width="100%" marginTop={5} p={2}>
        <Heading fontSize={16}>产量信息</Heading>
        <YieldBox />
      </Box>
      <InfosTable />
      <Box
        bg="white"
        rounded="lg"
        width="100%"
        marginBottom={5}
        marginTop={5}
        p={2}>
        <Heading fontSize={16}>料盒信息</Heading>
        <HStack flexWrap="wrap" mt={6}>
          <AutoInputs ref={autoInputRef} />
        </HStack>
      </Box>
      <Scrap type="报废数量" ref={scrapRef} />
      <Scrap type="次品数量" ref={defectiveRef} />
      <Box width="100%" marginBottom={5} p={2}>
        <Button onPress={handleTrackIn}>确认出机</Button>
      </Box>
    </>
  );
};

export default CardTable;
