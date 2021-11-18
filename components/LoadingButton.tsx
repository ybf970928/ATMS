import React, {useState} from 'react';
import {Button} from 'native-base';

interface IProps {
  showLoading?: boolean;
  title: string;
  onPress: () => Promise<void> | void;
  [propName: string]: any;
}

const LoadingButton: React.FC<IProps> = ({
  title,
  onPress,
  showLoading = true,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const requestApi = async () => {
    setLoading(true);
    try {
      await onPress();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Button
      isLoading={showLoading ? loading : false}
      {...props}
      onPress={requestApi}>
      {title}
    </Button>
  );
};

export default LoadingButton;
