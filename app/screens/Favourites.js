import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Favourites = () => {

    const movies = useSelector(state => state.movies);

    useEffect(() => {
        console.log(movies.length);
    }, [movies]);
    return (
        <View>
            <Text>Favourites</Text>
        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({})