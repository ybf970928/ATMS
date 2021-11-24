import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Input, View, useToast} from 'native-base';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';

interface IInputProps {
  render: (
    eventKeyDown: (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => void,
  ) => JSX.Element;
}

const AutoInputs = forwardRef(({}, ref: React.ForwardedRef<unknown>) => {
  const toast = useToast();
  const [inputValues, setInputValues] = useState<String[]>([]);
  const [inputs, setinputs] = useState<IInputProps[]>([
    {
      render: (
        eventKeyDown:
          | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
          | undefined,
      ) => {
        return (
          <Input
            w={180}
            h={10}
            onSubmitEditing={eventKeyDown}
            multiline={true}
            blurOnSubmit={true}
            mr={2}
            mb={2}
          />
        );
      },
    },
  ]);

  useImperativeHandle(ref, () => ({
    values: inputValues,
  }));

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (e.nativeEvent.text && !inputValues.includes(e.nativeEvent.text)) {
      setInputValues(inputValues.concat([e.nativeEvent.text]));
      setinputs(
        inputs.concat([
          {
            render: eventKeyDown => {
              return (
                <Input
                  w={180}
                  h={10}
                  onSubmitEditing={eventKeyDown}
                  multiline={true}
                  blurOnSubmit={true}
                  autoFocus
                  mr={2}
                  mb={2}
                />
              );
            },
          },
        ]),
      );
    } else {
      toast.show({
        description: '请勿重复添加',
      });
    }
  };
  return (
    <>
      {inputs.map((item, index) => {
        return <View key={index}>{item.render(handleKeyDown)}</View>;
      })}
    </>
  );
});

export default AutoInputs;
