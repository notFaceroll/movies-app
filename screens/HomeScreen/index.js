import { useLayoutEffect, useState } from "react";
import { Dimensions, ScrollView, FlatList } from "react-native";
import { Divider, Text } from 'react-native-paper';
import HomeGridTile from "../../components/HomeGridTile";

import { FadeInRight } from 'react-native-reanimated';

export default function HomeScreen({ navigation }) {
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const viewCount = 5;

  useLayoutEffect(() => {
    async function loadTopRated() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&page=1'
        );
        const data = await response.json();
        setTopRated(data.results);

      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function loadUpcoming() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&page=1'
        );
        const data = await response.json();
        setUpcoming(data.results);

      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    loadTopRated();
    loadUpcoming();

  }, [])

  function renderMovies({ item, index }) {
    function pressHandler() {
      navigation.navigate('MovieDetails', {
        id: item.id,
      });
    }

    return (
      <HomeGridTile
        poster={item.poster_path}
        title={item.title || item.name}
        onPress={pressHandler}
        entering={FadeInRight.delay(
          (viewCount - index) * 100
        ).duration(200)}
      />
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text variant="titleLarge">Top Rated Movies</Text>
      <FlatList
        horizontal
        data={topRated}
        renderItem={renderMovies}
        keyExtractor={(item) => item.id}
      />
      <Text variant="titleLarge">Upcoming Soon in Theatres</Text>
      <FlatList
        horizontal
        data={upcoming}
        renderItem={renderMovies}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}