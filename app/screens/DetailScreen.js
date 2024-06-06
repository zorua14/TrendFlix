import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getMovieCast, getMovieDetails, getSeriesCast, getSeriesDetails } from "../api/tmdb";
import Loading from "../components/Loading";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';


const { width, height } = Dimensions.get('window')
const DetailScreen = ({ navigation, route }) => {
    //movie is a bool to show it is a movie or a tv show

    const { item, movie } = route.params
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {

        getDetails(item.id);
        getCast(item.id);
    }, []);
    const getDetails = async (id) => {
        const data = movie ? await getMovieDetails(id) : await getSeriesDetails(id);

        if (data) {

            setDetails(data)
        };
        setLoading(false);
    };
    const getCast = async (id) => {
        const data = movie ? await getMovieCast(id) : await getSeriesCast(id);

        if (data && data.cast) {


            setCast(data.cast)
        };

    };

    return (
        loading ? (<Loading />) :
            (<ScrollView
                scrollEnabled={true}
                style={{ flex: 1, backgroundColor: Colors.Content_Background_Color }}
                contentContainerStyle={{ paddingBottom: 20 }}>
                <StatusBar backgroundColor="transparent" />
                <View style={{ width: "100%" }}>
                    <SafeAreaView style={styles.safe}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-sharp" size={30} color="yellow" />
                        </TouchableOpacity>
                        <Text
                            style={{ color: "white", fontSize: 24, fontFamily: "Lato-Bold" }}
                        >
                            {" "}
                        </Text>
                        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                            <Ionicons name={isLiked ? "heart-sharp" : "heart-outline"} size={30} color={isLiked ? "yellow" : "white"} />
                        </TouchableOpacity>

                    </SafeAreaView>


                    <View>
                        <Image source={
                            details.poster_path
                                ? { uri: `https://image.tmdb.org/t/p/w500/${details.poster_path}` }
                                : require('../../assets/images/404.png')
                        }
                            style={{ width, height: height * 0.55 }} />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{ width, height: height * 0.4, position: "absolute", bottom: 0 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }} />
                    </View>


                </View>
                <View style={{ marginTop: -(height * 0.09), marginVertical: 10 }}>
                    <Text style={{ color: "white", fontSize: 30, fontFamily: "Lato-Bold", textAlign: "center", marginHorizontal: 10 }}>
                        {movie ? details.title : (details.original_name || "No Title")}
                    </Text>
                    <Text style={{ color: Colors.Text_Light_Gray, fontFamily: "Lato-Bold", textAlign: "center", margin: 10 }}>
                        {details.status} . {movie ? details.release_date.split('-')[0] : (details.first_air_date.split('-')[0] || "No Date")} . {movie ? (details.runtime) + " min" : (details.number_of_seasons ? (details.number_of_seasons + " Season") : "NA")}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginHorizontal: 10 }}>
                        {
                            details.genres.map((genre, index) => {
                                let showdot = index + 1 != details.genres.length
                                return (
                                    <Text key={index} style={{ textAlign: "center", fontFamily: "Lato-Regular", color: "white", marginHorizontal: 2 }}>{genre.name}{ } {showdot ? "." : ""}</Text>
                                )
                            })}

                        {/* <Text style={{ textAlign: "center", fontFamily: "Lato-Regular", color: "white" }}>Action .</Text>
                        <Text style={{ textAlign: "center", fontFamily: "Lato-Regular", color: "white", marginLeft: 5 }}>Action .</Text>
                        <Text style={{ textAlign: "center", fontFamily: "Lato-Regular", color: "white", marginLeft: 5 }}>Action .</Text> */}

                    </View>
                    <Text style={{ justifyContent: "center", textAlign: details.overview ? "justify" : "center", fontFamily: "Lato-Regular", color: "white", paddingTop: 15, paddingHorizontal: 15 }}>
                        {details.overview ? details.overview : "No Overview 😔"}
                    </Text>

                </View>
                <Cast cast={cast} />


            </ScrollView>
            )



    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Content_Background_Color

    },

    safe: {
        position: "absolute",
        width: "100%",
        zIndex: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,

    }
})
