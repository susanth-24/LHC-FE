// import { StyleSheet, Text, View } from '@react-pdf/renderer'

// const styles = StyleSheet.create({
//   container: {
//     borderTop: '1px double #666',
//     marginTop: 24,
//     paddingTop: 24,
//   },
//   bold: {
//     fontSize: 11,
//   },
//   body: {
//     lineHeight: 1.8,
//     marginTop: 8,
//   },
// })

// function Body({ RoomName, sessionName, ExpectedMembers,date,startTime,endTime,remarks,reason,status }) {
  
//   return (
//     <View style={styles.container}>
//       <Text style={{ marginBottom: 8 }}>Room Name: {RoomName}</Text>
//       <Text style={styles.body}>Session Name: {sessionName}</Text>
//       <Text style={styles.body}>ExpectedMembers: {ExpectedMembers}</Text>
//       <Text style={styles.body}>Date: {date}</Text>
//       <Text style={styles.body}>From: {startTime} To {endTime}</Text>
//       <Text style={styles.body}>Reason: {reason}</Text>
//       <Text style={styles.body}>Remarks: {remarks}</Text>
//       <Text style={styles.body}>Status: {status}</Text>


//     </View>
//   )
// }

// export default Body

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000' },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCell: { flex: 1, padding: 8, textAlign: 'center' },
});

const Body = ({ RoomName, sessionName, ExpectedMembers, date, startTime, endTime, remarks, reason, status }) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Room Name:</Text>
          <Text>{RoomName}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Session Name:</Text>
          <Text>{sessionName}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Expected Members:</Text>
          <Text>{ExpectedMembers}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Date:</Text>
          <Text>{date}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Time:</Text>
          <Text>{startTime} to {endTime}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Reason:</Text>
          <Text>{reason}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Remarks:</Text>
          <Text>{remarks}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Status:</Text>
          <Text>{status}</Text>
        </View>
      </View>
    </View>
  );
};

export default Body;
