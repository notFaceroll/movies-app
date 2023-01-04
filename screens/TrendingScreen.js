import { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import GridTile from "../components/GridTile";

export default function TrendingScreen({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    async function loadTrending() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&page=1'
          );
        const data = await response.json();
        setTrending(data.results);

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrending();
  }, [])

  function renderTrendingMovie({ item }) {
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
      data={trending}
      renderItem={renderTrendingMovie}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  )
}