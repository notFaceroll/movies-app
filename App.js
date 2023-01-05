import { FavoritesProvider } from './store/favorites-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import TrendingScreen from './screens/TrendingScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import QueryDetailsScreen from './screens/QueryDetailsScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Overview() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#bcbcbc',
        tabBarStyle: {
          // position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          padding: 4,
          // borderTopRightRadius: 20,
          // borderTopLeftRadius: 20,
          borderTopColor: "transparent",
          elevation: 0,
        },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#D64242',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingScreen}
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <StatusBar style='light' />
          <Stack.Navigator initialRouteName='Overview'>
            <Stack.Screen
              name="Overview"
              component={Overview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieDetails"
              component={MovieDetailsScreen}
              options={{
                headerTitle: 'Movie Details',
                headerStyle: {
                  backgroundColor: 'rgba(0, 0, 0, 0.90)'
                },
                headerTintColor: '#eeeeee'
              }}
            />
            <Stack.Screen
              name="QueryDetails"
              component={QueryDetailsScreen}
              options={{
                headerTitle: 'Search Results',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </PaperProvider>
  );
}
