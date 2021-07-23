import {Box, Heading, Stack} from 'native-base';
import React from 'react';

const MaterialInfoTrackIn: React.FC = () => {
  return (
    <Box bg="white" maxWidth="100%" rounded="lg" marginBottom={5}>
      <Stack space={2} p={[4, 4, 4, 2]}>
        <Heading size="md" noOfLines={2} fontSize="sm">
          材料信息
        </Heading>
        <Box>待定....</Box>
      </Stack>
    </Box>
  );
};

export default MaterialInfoTrackIn;
