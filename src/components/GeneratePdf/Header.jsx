import { StyleSheet, Text, View, Image } from '@react-pdf/renderer'
import { DateTime } from 'luxon'
import logo from "../../assets/iitrpr_logo.jpg";


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 12,
        paddingBottom: 16,
    },
    h1: {
        fontSize: 20,
        fonttWeight: 600,
    },
    h2: {
        fontSize: 20,
        marginTop:2,
    },
    left: {
        flex: 1,
      },
    logo: {
        width: 74,
        height: 74,
    },
    
})

function Header({ date }) {
    const formattedDate =
        date && DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    return (
        <View style={styles.container}>

            <View style={styles.left}>
                <Image style={styles.logo} src={logo} />
                <Text style={styles.h1} >IIT Ropar</Text>
                <Text>Rupnagar</Text>
                <Text>Punjab - 140001</Text>
                <Text>admin@iitrpr.ac.in</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.h2}>Booking Portal</Text>
                <Text>{formattedDate}</Text>
            </View>
        </View>
    )
}

export default Header
