import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  description: {
    width: '60%',
    textAlign: 'left',
    paddingLeft: 8,
  },
  qty: {
    width: '40%', 
    textAlign: 'right',
    paddingRight: 8,
  },
});

const TableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
