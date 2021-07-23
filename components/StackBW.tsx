import {Stack} from 'native-base';
import React from 'react';
export const OnMachineStack: React.FC = ({children}) => {
  return (
    <Stack
      mx={6}
      p={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="center">
      {children}
    </Stack>
  );
};
