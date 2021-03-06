import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {IColProps} from '../types/Table';

interface IProps {
  dataSource: any[];
  _index?: number;
  columns: IColProps<any>[];
}

const TableV2: React.FC<IProps> = ({dataSource, columns, _index}) => {
  const Item = ({item, index = _index!}: {item: any; index: number}) => {
    const {handleSubmit, control, setValue} = useForm<any>();
    useEffect(() => {
      for (const [key, value] of Object.entries(item)) {
        setValue(key, value);
      }
    }, [item, setValue]);
    return (
      <View style={styles.item}>
        {columns.map(col => {
          return (
            <View
              style={[
                col.width ? {width: col.width} : styles.row,
                styles.shareCell,
              ]}
              key={col.title + ''}>
              <Controller
                control={control}
                render={({field}) =>
                  col.render ? (
                    col.render(field, handleSubmit, setValue, index)
                  ) : (
                    <Text>{field.value}</Text>
                  )
                }
                name={col.dataIndex.toString()}
              />
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.tableBody}>
      {/* 表头 */}
      <View style={styles.tableHeader}>
        {columns.map((col, i) => {
          return (
            <Text
              style={[
                col.width ? {width: col.width} : styles.title,
                styles.shareCell,
              ]}
              key={(col.dataIndex as string) + '' + i}>
              {col.title}
            </Text>
          );
        })}
      </View>
      <View style={styles.tableContent}>
        {dataSource.length > 0 ? (
          dataSource.map((item, index) => {
            return <Item item={item} key={index} index={index} />;
          })
        ) : (
          <Text style={{paddingVertical: 10!}}>暂无数据</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBody: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableContent: {
    width: '100%',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  shareCell: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});
export default TableV2;
