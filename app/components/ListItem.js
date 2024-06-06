import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable'
const ListItem = ({ item, navigation, movie, index }) => {
    const maxDuration = 4000; // Maximum duration in ms
    const baseDuration = 1000; // Base duration in ms
    const duration = Math.min(baseDuration * ((index % 20) + 0.7), maxDuration);
    return (
        <TouchableOpacity onPress={() => navigation.navigate('detail_screen', { item, movie })} style={styles.movieContainer}>
            <Animatable.View style={styles.content} animation={'slideInUp'} duration={duration}>
                <Animatable.Image animation={'zoomIn'} duration={duration} source={{ uri: `https://image.tmdb.org/t/p/w342/${item.poster_path}` }} style={styles.image} />
                <Animatable.Text animation={'zoomIn'} duration={duration} style={styles.title} numberOfLines={1}
                    ellipsizeMode="tail">{movie ? item.title : item.original_name}</Animatable.Text>
                <Animatable.View style={styles.ratingContainer} animation={'slideInLeft'} duration={duration}>
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