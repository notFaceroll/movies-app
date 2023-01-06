import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../HomeScreen';
import SearchScreen from '../SearchScreen';
import TrendingScreen from '../TrendingScreen';
import FavoritesScreen from '../FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function Overview() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#bcbcbc',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 1)',
          padding: 4,
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