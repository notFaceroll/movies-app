import { useLayoutEffect, useState } from 'react';
import MoviesService from '../../services/MoviesService';

import { FlatList, View, Text } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Gradient from '../../components/Gradient';
import GridTile from '../../components/GridTile';

export default function QueryDetailsScreen({ navigation, route }) {
  const { id, query, name } = route.params;
  const [queryResult, setQueryResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true)
    try {
      async function loadQuery() {
        if (id) {
          const moviesToRender = await MoviesService.discover(id);
          setQueryResult(moviesToRender);
        } else {
          const moviesToRender = await MoviesService.searchMovie(query);
          setQueryResult(moviesToRender);
        }
        setIsLoading(false);
      }
      loadQuery();
    } catch (error) {
      console.log({ error })
    }
  }, [])

  function renderQuery({ item }) {
    function pressHandler() {
      navigation.navigate('MovieDetails', {
        id: item.id,
      });
    }

    return (
      <GridTile
        poster={item.poster_path}
        title={item.title || item.name}
        onPress={pressHandler}
      />
    );
  }

  return (
    <Gradient>
      <View style={{ paddingVertical: 8 }}>
        <Text style={{ color: '#eeeeee', textAlign: 'center', fontSize: 18 }}>Showing results for: {query || name}</Text>
      </View>
      {(queryResult.length > 0 && !isLoading) && (
        <FlatList
          data={queryResult}
          renderItem={renderQuery}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}
      {(queryResult.length === 0 && !isLoading) && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ color: '#eeeeee', fontSize: 24, textAlign: 'center' }}>Looks like we couldn't find what you're looking for :&#40;</Text>
        </View>
      )}
      {isLoading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator animating={true} size="large" color={MD2Colors.red800} />
        </View>
      )}
    </Gradient>
  )
}