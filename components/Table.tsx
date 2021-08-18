import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {IColProps} from '../types/Table';

interface IProps {
  dataSource: any[];
  columns: IColProps<any>[];
}

const Table: React.FC<IProps> = ({dataSource, columns}) => {
  const Item = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.item}>
        {columns.map(col => {
          return (
            <Text style={styles.title} key={col.title as string}>
              {col.render
                ? col.render(item[col.dataIndex], item, index)
                : item[col.dataIndex]}
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
              style={styles.title}
              key={(col.dataIndex as string) + '' + index}>
              {col.title}
            </Text>
          );
        })}
      </View>
      {/* <FlatList
        scrollEnabled={false}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      <View>
        {dataSource.map((item, index) => {
          return <Item item={item} index={index} key={index} />;
        })}
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
});
export default Table;
