import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { searchMovies, searchSeries } from '../api/tmdb'

const { width, height } = Dimensions.get('window')
const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    // const moviename = "ssjnsksksjskkjkjkjksjksjksss"
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const route = useRoute();
    const { movie } = route.params;
    const handleChange = (value) => {

        if (value && value.length > 2) {
            setLoading(true)
            if (movie) {
                searchMovies(
                    {
                        query: value, include_adult: 'false', language: 'en-US', page: '1'

                    }).then(data => {
                        setLoading(false)
                        if (data && data.results) setResults(data.results)
                    })
            }
            else {
                searchSeries(
                    {
                        query: value, include_adult: 'false', language: 'en-US', page: '1'

                    }).then(data => {
                        setLoading(false)
                        if (data && data.results) setResults(data.results)
                    })
            }

        } else {
            setLoading(false)
            setResults([])
        }
    }
    const handleDebounceSearch = useCallback(debounce(handleChange, 400), [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Content_Background_Color }}>
            <View style={styles.searchBox}>
                <TextInput
                    onChangeText={handleDebounceSearch}
                    placeholder={'Search' + (movie ? ' Movies' : ' Series')}
                    placeholderTextColor={'lightgray'}
                    style={{ fontSize: 20, color: "black", fontFamily: "Lato-Regular", width: "90%" }}>

                </TextInput>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <Loading />) : results.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        style={styles.scrollview}>
                        <Text style={{ fontSize: 24, fontFamily: "Lato-Regular", color: "white" }}>Results ({results.length})</Text>
                        <View style={styles.resultsContainer}>
                            {
                                results.map((item, index) => {

                                    const moviename = item.title ? item.title : (item.name ? item.name : 'No Title');


                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.push('detail_screen', { item, movie: true })}

                                        >
                                            <View style={{ marginVertical: 10, }}>
                                                <Image resizeMode={item.poster_path ? null : "center"} style={[styles.image, { backgroundColor: item.poster_path ? null : "white" }]} source={
                                                    item.poster_path
                                                        ? { uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }
                                                        : require('../../assets/images/404.png')
                                                } />
                                                <Text style={{ fontSize: 16, fontFamily: "Lato-Regular", color: Colors.Text_Light_Gray, marginTop: 10, padding: 5, width: width * 0.44 }}>
                                                    {
                                                        moviename.length > 22 ? moviename.substring(0, 22) + "..." : moviename
                                                    }

                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                    )
                                })
                            }

                        </View>
                    </ScrollView>

                ) : (
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                    <Image resizeMode="contain" source={require('../../assets/images/watching.png')} style={{ width: width * 0.6, height: height * 0.5 }} />

                </View>
            )}


        </SafeAreaView>

    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor: 'white',
        height: 50,
        marginTop: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,

    },
    scrollview: {
        marginVertical: 10
    },
    resultsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    }, image: {
        borderRadius: 10,
        width: width * 0.44,
        height: height * 0.3
    }

})