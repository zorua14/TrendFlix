import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable'
const ListItem = ({ item, navigation, movie, index }) => {

    return (

        <TouchableOpacity onPress={() => navigation.navigate('detail_screen', { item, movie })} style={styles.movieContainer}>
            <Animatable.View key={`${item.id}-${index}`} style={styles.content} animation={'slideInUp'} >
                <Animatable.Image
                    animation={'zoomIn'}
                    resizeMode={item.poster_path ? null : "center"}
                    style={[styles.image, { backgroundColor: item.poster_path ? null : "white" }]}
                    source={
                        item.poster_path
                            ? { uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }
                            : require('../../assets/images/404.png')
                    }
                />
                <Animatable.Text animation={'zoomIn'} style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {movie ? item.title : item.original_name}
                </Animatable.Text>
                <Animatable.View style={styles.ratingContainer} animation={'slideInLeft'} >
                    <Ionicons name="star" size={20} color="yellow" />
                    <Text style={styles.rating}>{Math.round(item.vote_average * 10) / 10}</Text>
                </Animatable.View>
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    movieContainer: { flex: 1, margin: 10, alignItems: 'center', padding: 5, width: '50%' },
    image: { width: 150, height: 225, borderRadius: 10, },
    title: { marginTop: 10, fontSize: 16, fontFamily: "Lato-Regular", color: Colors.Text_Light_Gray, textAlign: 'center', width: '90%' },
    rating: { fontSize: 14, color: 'yellow', marginLeft: 8 },
    ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
    content: {
        alignItems: 'center',
        width: '100%',
    }
})