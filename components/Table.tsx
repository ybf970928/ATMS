import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export interface TableProps<T> {
  title: string;
  dataIndex: keyof T | '';
  width?: string | number;
  render?: (value: string, item: any, $index: number) => JSX.Element;
}

interface IProps {
  dataSource: any[];
  columns: TableProps<any>[];
}

const Table: React.FC<IProps> = ({dataSource, columns}) => {
  const Item = ({item, $index}: {item: any; $index: number}) => {
    return (
      <View style={styles.item}>
        {columns.map(col => {
          return col.render ? (
            <View
              style={[col.width ? {width: col.width} : null, styles.title]}
              key={col.title + ''}>
              {col.render(item[col.dataIndex], item, $index)}
            </View>
          ) : (
            <Text
              style={[col.width ? {width: col.width} : null, styles.title]}
              key={col.title + ''}>
              {item[col.dataIndex]}
            </Text>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.tableBody}>
      {/* 表头 */}
      <View style={styles.tableHeader}>
        {columns.map((col, index) => {
          return (
            <Text
              style={[col.width ? {width: col.width} : null, styles.title]}
              key={(col.dataIndex as string) + '' + index}>
              {col.title}
            </Text>
          );
        })}
      </View>
      <View style={styles.tableContent}>
        {dataSource.length > 0 ? (
          dataSource.map((item, index) => {
            return <Item item={item} key={index} $index={index} />;
          })
        ) : (
          <Text>暂无数据</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBody: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'center',
  },
  tableContent: {
    width: '100%',
    alignItems: 'center',
  },
});
export default Table;
