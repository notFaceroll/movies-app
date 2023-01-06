import { FavoritesProvider } from './store/favorites-context';
import { StatusBar } from 'expo-status-bar';

import { Provider as PaperProvider } from 'react-native-paper';

import MovieDetailsScreen from './screens/MovieDetailsScreen';
import QueryDetailsScreen from './screens/QueryDetailsScreen';
import Overview from './screens/Overview';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <StatusBar style='light' />
          <Stack.Navigator
            initialRouteName='Overview'
          >
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
                headerTitle: 'Search',
                headerStyle: {
                  backgroundColor: '#000'
                },
                headerTintColor: '#eeeeee'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </PaperProvider>
  );
}
