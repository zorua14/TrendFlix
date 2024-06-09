import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { StatusBar } from 'expo-status-bar'
import Colors from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import Keys from '../constants/Keys'
import ListItem from '../components/ListItem'
import SkeletonItem from '../components/SkeletonItem'
import Error from '../components/Error'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const SeriesScreen = ({ navigation }) => {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [fetching, setFetching] = useState(false)
    const [isFirstLaunch, setFirstLaunch] = useState(true)
    const [error, setError] = useState(false)

    const [showButton, setShowButton] = useState(false);
    const flatListRef = useRef(null)
    const buttonScale = useRef(new Animated.Value(0)).current;
    const previousScrollY = useRef(0);
    useEffect(() => {
        getSeries()
    }, [])
    const handleScrollToTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 100 && offsetY > previousScrollY.current && !showButton) {
            setShowButton(true);
            Animated.spring(buttonScale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }).start();
        } else if (offsetY < previousScrollY.current && showButton) {
            Animated.spring(buttonScale, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true,
            }).start(() => setShowButton(false));
        }
        previousScrollY.current = offsetY;
    }
    const getSeries = () => {
        setFetching(true)
        const nextPage = page + 1;
        if (nextPage <= totalPage) {
            setTimeout(() => {
                fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${Keys.api_key}&page=${nextPage}`)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            setError(true)
                            throw new Error("Something went wrong")

                        }
                    })
                    .then(response => {
                        setFetching(false)
                        setSeries([...series, ...response.results]);
                        setPage(nextPage);
                        setTotalPage(response.total_pages)
                        setFirstLaunch(false)

                    })
                    .catch(err => {
                        setFetching(false)
                        setFirstLaunch(false)

                    });
            }, 1000);

        } else {
            setFetching(false)
            setFirstLaunch(false)

        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <ListItem item={item} navigation={navigation} movie={false} index={index} />
        )
    };

    const sortByName = () => {
        const sortedSeries = [...series].sort((a, b) => {
            const nameA = a.original_name || "";
            const nameB = b.original_name || "";
            return nameA.localeCompare(nameB);
        });
        setSeries(sortedSeries);
    };


    const sortByRating = () => {
        const sortedSeries = [...series].sort((a, b) => {
            const ratingA = a.vote_average ?? 0;
            const ratingB = b.vote_average ?? 0;
            return ratingB - ratingA;  // Descending order
        });
        setSeries(sortedSeries);
    };


    const sortByPopularity = () => {
        const sortedSeries = [...series].sort((a, b) => {
            const rankA = a.popularity ?? 0;
            const rankB = b.popularity ?? 0;
            return rankB - rankA;  // Descending order
        });
        setSeries(sortedSeries);
    };
    if (error) {
        return <Error message={"Something went wrong. Please try again later."} />;
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 20 }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.Top_Bar_Color} />
                <View style={styles.header}>
                    <Menu>
                        <MenuTrigger >
                            <MaterialIcons name="sort" size={30} color="white" />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={sortByName}>
                                <Text style={{ padding: 10 }}>Sort by Name</Text>
                            </MenuOption>
                            <MenuOption onSelect={sortByRating}>
                                <Text style={{ padding: 10 }}>Sort by Rating</Text>
                            </MenuOption>
                            <MenuOption onSelect={sortByPopularity}>
                                <Text style={{ padding: 10 }}>Sort by Popularity</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Text style={{ color: "white", fontSize: 24, fontFamily: "Lato-Bold" }}>Trending Series</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('search_screen', { movie: false })}>
                        <Entypo name="magnifying-glass" size={30} color="white" />
                    </TouchableOpacity>

                </View>

                {isFirstLaunch ? (<FlatList
                    data={[1, 1, 1, 1, 1, 1]}
                    renderItem={() => <SkeletonItem />}
                    numColumns={2}

                />) : (
                    <FlatList
                        ref={flatListRef}
                        data={series}
                        renderItem={renderItem}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item.original_name}_${index}`}
                        contentContainerStyle={styles.list}
                        onEndReached={getSeries}
                        onEndReachedThreshold={.1}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ width: '90%', height: 60, alignSelf: "center", alignItems: "center" }}>
                                    {fetching && <ActivityIndicator size={"large"} color={"orange"} />}

                                </View>

                            )
                        }}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    />)}
                {series.length > 0 ?
                    <Animated.View style={[styles.stickyButton, { transform: [{ scale: buttonScale }] }]}>
                        <TouchableOpacity onPress={handleScrollToTop}>
                            <Entypo name="arrow-up" size={24} color={"white"} />
                        </TouchableOpacity>
                    </Animated.View> : null}

            </SafeAreaView>
        </View>
    )
}

export default SeriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Content_Background_Color

    },

    list: {
        paddingVertical: 10
    },
    stickyButton: {
        position: 'absolute',
        bottom: 60,
        right: 30,
        backgroundColor: Colors.Top_Bar_Color,
        padding: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.Top_Bar_Color,
        height: 60
    }
})