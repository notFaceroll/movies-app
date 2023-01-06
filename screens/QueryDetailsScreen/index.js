import { useLayoutEffect, useState, useEffect } from 'react';
import GridTile from '../../components/GridTile';
import { FlatList, View, Text } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Gradient from '../../components/Gradient';

function delay(ms = 1000) {
  console.log('delay')
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function QueryDetailsScreen({ navigation, route }) {
  const { id, query, name } = route.params;
  const [queryResult, setQueryResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true)
    try {
      async function loadQuery() {
        if (id) {
          const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&with_genres=${id}`);
          const json = await data.json();
          setQueryResult(json.results);
        } else {
          const data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=4c00770e06a5046da486fdd9a5b221d8&query=${query}`)
          const json = await data.json();
          setQueryResult(json.results);
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