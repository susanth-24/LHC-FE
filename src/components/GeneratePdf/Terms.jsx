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

function Terms() {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Instructions!</Text>
      <Text>1. Please submit the approval form to the security guard</Text>
      <Text>2. Please inform security guard before leaving the Hall</Text>
      <Text>3. Please ensure cleanliness of the Hall</Text>

    </View>
  )
}

export default Terms
