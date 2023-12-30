import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  bold: {
    // fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  container: {
    borderTop: '1px double #666',
    marginTop: 18,
    paddingTop: 18,
  },
})

function Client({ name, email, phnumber,entryNumber }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Booked By:</Text>
      <Text>Club: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone Number: {phnumber}</Text>
      <Text>Entry Number: {entryNumber}</Text>

    </View>
  )
}

export default Client
