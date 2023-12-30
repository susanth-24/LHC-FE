import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
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

const TableHead = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.qty}>Value</Text>
    </View>
);

export default TableHead