import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const Favourites = () => {

    const movies = useSelector(state => state.movies);

    useEffect(() => {
        console.log(movies.length);
    }, [movies]);
    const renderItem = ({ item, index }) => {
        return (

            <View style={styles.listitem}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ color: Colors.Text_Light_Gray, fontSize: 18, fontFamily: "Lato-Regular", padding: 10, }} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                    <Entypo name="trash" size={24} color="red" style={{ alignSelf: "flex-end", marginTop: 10, bottom: -10 }} />
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
                    <TouchableOpacity>
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
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        borderRadius: 18,
        padding: 10,
        borderWidth: 2,
        borderColor: "white",

    }
})
