import React from 'react';
import {CheckIcon, Select} from 'native-base';
import {OnMachineStack} from './StackBW';

type SelectData = {
  label: string;
  value: string;
  option?: {id: string | number; name: string}[];
  w: string;
  onValueChange: (arg: any) => void;
};

export const FormSelect: React.FC<SelectData> = ({
  label,
  onValueChange,
  value,
  option = [],
  children,
  w,
}) => {
  return (
    <OnMachineStack>
      {children}
      <Select
        style={{height: 40!}}
        w={w}
        placeholder={`请选择${label}`}
        selectedValue={value}
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}
        onValueChange={(itemValue: string) => {
          onValueChange(itemValue);
        }}>
        {option.map((node, index) => {
          return (
            <Select.Item
              label={node.name}
              value={node.id as string}
              key={index}
            />
          );
        })}
      </Select>
    </OnMachineStack>
  );
};
