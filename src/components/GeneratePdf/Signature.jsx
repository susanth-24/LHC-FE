import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signatureContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    margin: 'auto',
  },
  signature: {
    width: '20%',
    border: 1,
    padding: 8,
  },
  name: {
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    borderTop: '1px double #666',
    marginTop: 18,
    paddingTop: 18,
  },
});

const Signature = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>For Academic Section use only</Text>
      <View style={styles.signatureContainer}>
        <View style={styles.signature}>
          <Text>Signature 1</Text>
        </View>
        <View style={styles.signature}>
          <Text>Signature 2</Text>
        </View>
        <View style={styles.signature}>
          <Text>Signature 3</Text>
        </View>

      </View>
      </View>
);

export default Signature;
