import { Alert, Dimensions, FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';

import { removeMovie } from '../Redux/MovieSlice';
const { width, height } = Dimensions.get('window');
const Favourites = () => {

    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [movies]);
    const deleteMovie = (id) => {
        dispatch(removeMovie(id));
    }

    const shareMovies = async (movies) => {
        try {
            const movieTitles = movies.map(movie => movie.title).join('\n');
            const result = await Share.share({
                message: `Check out my liked movies:\n\n${movieTitles}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with specific activity type
                    console.log(`Shared with activity type: ${result.activityType}`);
                } else {
                    // Shared successfully
                    console.log('Movies shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                // Share dialog was dismissed
                console.log('Share dismissed');
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const renderItem = ({ item, index }) => {
        return (

            <View key={item.id} style={styles.listitem}>
                <Image
                    source={item.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }
                        : require('../../assets/images/404.png')}
                    style={{ width: 100, height: 150, borderRadius: 15 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ color: Colors.Text_Light_Gray, fontSize: 18, fontFamily: "Lato-Regular", padding: 10, }} numberOfLines={2} ellipsizeMode="tail">
                        {item.title}
                    </Text>
                    <TouchableOpacity onPress={() => deleteMovie(item.id)}>
                        {/* Missed a callback here and everyting went poof */}
                        <Entypo name="trash" size={28} color="red" style={{ alignSelf: "flex-end", marginTop: 10, bottom: -10 }} />
                    </TouchableOpacity>
                </View>
            </View>


        )
    };
    if (movies.length === 0) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.Content_Background_Color }}>
            <Text style={{ color: Colors.Text_Light_Gray, fontSize: 24, fontFamily: "Lato-Bold" }}>No Movies Liked</Text>
        </View>
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: height * 0.05, }}>
                <View style={styles.header}>
                    <Text style={{ color: "white", fontSize: 24, fontFamily: "Lato-Bold" }}>Liked Movies</Text>
                    <TouchableOpacity onPress={() => shareMovies(movies)}>
                        <Entypo name="share" size={24} color="white" />
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={movies}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    keyExtractor={(item, index) => `${item.title}_${index}`}
                />

            </SafeAreaView>

        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Content_Background_Color

    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.Top_Bar_Color,
        height: 60
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    emptyText: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'Lato-Bold',
    },
    listitem: {


        marginTop: 5,
        marginHorizontal: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "rgba(255,255,255,0.3)",
        borderBottomWidth: 1,


    }
})
