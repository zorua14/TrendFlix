import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Cast = ({ cast }) => {

    return (
        <View >
            <Text style={{ color: "yellow", fontSize: 30, fontFamily: "Lato-Bold", textAlign: "left", marginHorizontal: 20, marginBottom: 10 }}>Top Cast</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    cast && cast.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ marginRight: 10, marginTop: 10 }}
                            >
                                <Image source={
                                    item.profile_path
                                        ? { uri: `https://image.tmdb.org/t/p/w185/${item.profile_path}` }
                                        : require('../../assets/images/person.png')
                                } style={{ alignSelf: "center", width: 60, height: 60, borderRadius: 30, backgroundColor: "white" }} />

                                <Text style={{ color: "white", fontSize: 14, fontFamily: "Lato-Bold", textAlign: "center", marginTop: 10 }}>
                                    {item.character?.length > 10 ? item.character?.substring(0, 10) + '..' : item.character}

                                </Text>
                                <Text style={{ color: Colors.Text_Light_Gray, fontSize: 14, fontFamily: "Lato-Regular", textAlign: "center", marginTop: 5 }}>
                                    {item.name?.length > 10 ? item.name?.substring(0, 10) + '..' : item.name}

                                </Text>

                            </TouchableOpacity>
                        )
                    })
                }
                {
                    cast.length == 0 ? (

                        <Text style={{ color: "white", fontSize: 20, fontFamily: "Lato-Regular", textAlign: "center", marginTop: 10, marginLeft: 10 }}>Not available 😔</Text>
                    ) : null

                }
            </ScrollView>
        </View>
    )
}

export default Cast

const styles = StyleSheet.create({})