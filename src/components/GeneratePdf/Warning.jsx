import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  bold: {
    // fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'red',
  },
  container: {
    borderTop: '1px double #666',
    marginTop: 18,
    paddingTop: 18,
  },
})

function Warning() {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Warning!</Text>
      <Text>Do not forge this PDF, as this can be cross checked with the UID at the entrance of Hall.</Text>

    </View>
  )
}

export default Warning
