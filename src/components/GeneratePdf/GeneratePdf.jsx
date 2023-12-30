import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "../../assets/iitrpr_logo.jpg";
import Header from './Header';
import Client from './Client';
import Body from './Body';
import Footer from './Footer';
import ItemTable from './ItemTable';
import Terms from './Terms';
import Signature from './Signature';
import Warning from './Warning';

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',

  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 11,
    fontFamily: "Helvetica",
    paddingTop: 10
  },
  bottom: {
    position: 'absolute',
    bottom: 2,
    left: 7,
    right: 7,
  },
});

const MyDocument = ({ data }) => {
  
  console.log(data)
  return (

    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>

          <Header date={data?.createdAt} />
          <Client name={data?.name} email={data?.email} phnumber={data?.PhNumber} entryNumber={data?.entryNumber} />
          <ItemTable RoomName={data?.RoomName} sessionName={data?.sessionName} ExpectedMembers={data?.ExpectedMembers}
            date={data?.date} startTime={data?.startTime} endTime={data?.endTime} remarks={data?.remarks} reason={data?.reason} status={data?.requestStatus_1
            } UID={data?.UID} />
          <Terms />
          <Warning/>
          {/* <Signature/> */}
      
      </View>
        <View style={styles.bottom}>
          <Footer />
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;

// import React from 'react';
// import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// import logo from "../../assets/iitrpr_logo.jpg";

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     fontFamily: 'Helvetica',
//     fontSize: 11,
//     paddingTop: 30,
//     paddingLeft: 60,
//     paddingRight: 60,
//     lineHeight: 1.5,
//     flexDirection: 'column',
//   },
//   logo: {
//     width: 74,
//     height: 66,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     margin: 'auto',
//     marginTop: 20,
//   },
//   tableRow: {
//     margin: 'auto',
//     flexDirection: 'row',
//   },
//   tableCell: {
//     borderWidth: 1,
//     borderColor: '#000',
//     padding: 8,
//   },
//   footer: {
//     fontSize: 8,
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//   },
// });

// const MyDocument = ({ data }) => {
//   data = data?.[0];
//   console.log(data);

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Image style={styles.logo} src={logo} />
//         <Text style={styles.header}>Lecture Hall Booking Portal</Text>
//         <Text style={styles.header}>Booking Details</Text>

//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>Requested By:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.name}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>Room Name:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.RoomName}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>Session Name:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.sessionName}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>Expected Members:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.ExpectedMembers}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>Date:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.date}</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>Start Time:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.startTime}</Text>
//               </View>
//               </View>
//               <View style={styles.tableRow}>
//             <View style={styles.tableCell}>
//               <Text>End Time:</Text>
//             </View>
//             <View style={styles.tableCell}>
//               <Text>{data?.endTime}</Text>
//               </View>
//               </View>
//               </View>
//               </Page>
//               </Document>
//   )}

// export default MyDocument;