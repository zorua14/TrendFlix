import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
const Error = ({ message }) => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="signal-wifi-statusbar-connected-no-internet-4" size={40} color={Colors.Text_Light_Gray} />
            <Text style={styles.error}>{message}</Text>
        </View>
    )
}

export default Error

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    error: { fontSize: 20, fontWeight: 'bold', color: Colors.Text_Light_Gray }
})