import { FavoritesProvider } from './store/favorites-context';
import { StatusBar } from 'expo-status-bar';

import { Provider as PaperProvider } from 'react-native-paper';

import MovieDetailsScreen from './screens/MovieDetailsScreen';
import QueryDetailsScreen from './screens/QueryDetailsScreen';
import Overview from './screens/Overview';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Toast, { SuccessToast, ErrorToast } from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator();

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: '#C2ABA8',
        borderColor: 'green',
      }}
      text1Style={{
        fontSize: 18,
        fontWeight: '400'
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#C2ABA8',
        borderColor: 'red',
      }}
      text1Style={{
        fontSize: 18,
        fontWeight: '400'
      }}
    />
  ),
}
let firstRender = true;

export default function App() {
  const [netStatus, setNetStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetStatus(state.isConnected);
    });

    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }

    if (!netStatus) {
      Toast.show({
        type: 'error',
        text1: 'Lost internet connection',
        position: 'bottom'
      })
    }
    else {
      Toast.show({
        type: 'success',
        text1: 'Restored internet connection',
        position: 'bottom'
      })
    }

  }, [netStatus]);


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
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}
