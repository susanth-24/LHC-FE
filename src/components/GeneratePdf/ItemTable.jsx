import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TableHead from './TableHead';
import TableRow from './TableRow';


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

const ItemTable = ({ RoomName, sessionName, ExpectedMembers, date, startTime, endTime, remarks, reason, status,UID }) => {
    const items = [
        {
          sno: 1,
          desc: "Room Name",
          qty: RoomName,
        },
        {
          sno: 2,
          desc: "session Name",
          qty: sessionName,
        },
        {
          sno: 3,
          desc: "Expected Members",
          qty: ExpectedMembers,
        },
        {
          sno: 4,
          desc: "Date",
          qty: date,
        },
        {
          sno: 5,
          desc: "Start Time",
          qty: startTime,
        },
        {
          sno: 6,
          desc: "End Time",
          qty: endTime,
        },
        {
          sno: 7,
          desc: "Remarks",
          qty: remarks,
        },
        {
          sno: 8,
          desc: "Reason",
          qty: reason,
        },
        {
          sno: 9,
          desc: "Status",
          qty: status,
        },
      ];
      
      if (status === 'Approved') {
        items.push({
          sno: 10,
          desc: "UID",
          qty: UID,
        });
      }
      
    return (
        <View style={styles.tableContainer}>
            <TableHead />
            <TableRow items={items} />
        </View>
    );
};


export default ItemTable