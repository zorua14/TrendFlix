import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from './app/screens/MoviesScreen';
import DetailScreen from './app/screens/DetailScreen';
import SeriesScreen from './app/screens/SeriesScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from './app/constants/Colors';
import SearchScreen from './app/screens/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// MARK: RENAME stack
const MoviesStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name='movie_screen' component={MoviesScreen} options={{ headerShown: false }} />
            <Stack.Screen name='detail_screen' component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name='search_screen' component={SearchScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
const SeriesStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name='series_screen' component={SeriesScreen} options={{ headerShown: false }} />
            <Stack.Screen name='detail_screen' component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name='search_screen' component={SearchScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Movies') {
                            iconName = focused
                                ? 'film'
                                : 'film-outline';
                        } else if (route.name === 'Series') {
                            iconName = focused ? 'tv' : 'tv-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: { backgroundColor: Colors.Top_Bar_Color },
                    tabBarLabelStyle: { fontSize: 10, color: Colors.Text_Light_Gray, fontFamily: "Lato-Regular", marginBottom: 5 }
                })}>
                <Tab.Screen name="Movies" component={MoviesStack} options={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                        if (routeName === 'detail_screen' || routeName === 'search_screen') {
                            return { display: "none" };
                        }
                        return { backgroundColor: Colors.Top_Bar_Color };
                    })(route)
                })} />
                <Tab.Screen name="Series" component={SeriesStack} options={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                        if (routeName === 'detail_screen') {
                            return { display: "none" };
                        }
                        return { backgroundColor: Colors.Top_Bar_Color };
                    })(route)
                })} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}