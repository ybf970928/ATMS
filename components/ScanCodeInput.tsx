import React from 'react';
import {IconOutline} from '@ant-design/icons-react-native';
import {navigate} from '../utils/RootNavigation';
import {Input} from 'native-base';
import {OnMachineStack} from './StackBW';

type FormData = {
  label: string;
  value: string;
  prop: string;
  fromRoute: string;
  w?: string;
  onChangeText: (arg: any) => void;
};

export const ScanCodeInput: React.FC<FormData> = ({
  label,
  onChangeText,
  value,
  prop,
  fromRoute,
  children,
  w,
}) => {
  return (
    <OnMachineStack>
      {children}
      <Input
        h={10}
        p={1}
        w={w}
        onChangeText={(str: string) => onChangeText(str)}
        value={value}
        placeholder={`扫描或者输入${label}`}
        InputRightElement={
          <IconOutline
            size={20}
            name="scan"
            style={{padding: 10!}}
            onPress={() =>
              navigate('ScanQRCode', {
                formRoute: fromRoute,
                Keyword: prop,
              })
            }
          />
        }
      />
    </OnMachineStack>
  );
};
