import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    borderTop: '1px solid #999',
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
    marginTop: 32,
    paddingTop: 4,
  },
  left: {
    flex: 1,
  },
  right: {
    fontStyle: 'italic',
    fontSize: 7,
  },
})

function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.left}>IIT Ropar</Text>
      <Text style={styles.right}>
        Automatically Generated Message from Lecture Hall Booking Portal
      </Text>
    </View>
  )
}

export default Footer
