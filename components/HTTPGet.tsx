import React, {useEffect, useState, useCallback} from 'react';
// import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  request: () => Promise<any>;
  loading: JSX.Element;
  children: (data: any) => JSX.Element[];
}

const HTTPGet: React.FC<IProps> = ({request, children, loading}) => {
  const [childList, setChildList] = useState<JSX.Element[]>([loading]);

  const initData = useCallback(() => {
    const getData = async () => {
      try {
        const data = await request();
        setChildList(children(data));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [children, request]);

  useEffect(() => {
    initData();
  }, [initData]);

  return <>{childList}</>;
};

export default HTTPGet;
