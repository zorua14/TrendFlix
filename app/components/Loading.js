import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Loading = () => {
    return (
        <View style={{ flex: 1, width: '100%', height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.Content_Background_Color }}>
            <ActivityIndicator size={100} color={"orange"} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})