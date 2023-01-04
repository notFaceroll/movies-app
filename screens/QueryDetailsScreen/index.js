import { useLayoutEffect, useState } from 'react';
import GridTile from '../../components/GridTile';
import { FlatList } from 'react-native'

export default function QueryDetailsScreen({ navigation, route }) {
  const { id } = route.params;
  const [queryResult, setQueryResult] = useState([]);

  useLayoutEffect(() => {
    async function loadQuery() {
      const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&with_genres=${id}`);
      const json = await data.json();
      console.log(json);
      setQueryResult(json.results);
    }

    loadQuery();
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
    <FlatList
      data={queryResult}
      renderItem={renderQuery}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  )
}