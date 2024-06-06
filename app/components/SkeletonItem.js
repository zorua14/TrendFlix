import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)

const SkeletonItem = () => {
    return (
        <View style={styles.movieContainer}>
            <View >
                <ShimmerPlaceHolder style={styles.image} />
                <ShimmerPlaceHolder style={styles.title} ></ShimmerPlaceHolder>
                <ShimmerPlaceHolder style={styles.ratingContainer}>
                    {/* <Ionicons name="star" size={20} color="yellow" />
                    <Text style={styles.rating}>{item.vote_average}</Text> */}
                </ShimmerPlaceHolder>
            </View>
        </View>
    )
}

export default SkeletonItem

const styles = StyleSheet.create({
    movieContainer: { flex: 1, margin: 10, alignItems: 'center', },
    image: { width: 150, height: 225, borderRadius: 10, backgroundColor: "#9e9e9e", opacity: 0.2 },
    title: { marginTop: 10, width: 150, backgroundColor: "#9e9e9e", height: 14, opacity: 0.2, borderRadius: 5 },

    ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 5, backgroundColor: "#9e9e9e", height: 20, opacity: 0.2, width: 150, borderRadius: 5 }
})