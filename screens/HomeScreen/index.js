import { useLayoutEffect, useState } from "react";
import { Dimensions, ScrollView, FlatList } from "react-native";
import { Text } from 'react-native-paper';

import HomeGridTile from "../../components/HomeGridTile";
import { styles } from "./styles";

import { FadeInRight } from 'react-native-reanimated';
import Gradient from "../../components/Gradient";

export default function HomeScreen({ navigation }) {
  const [topRated, setTopRated] = useState([]);
  const [twenties, setTwenties] = useState([]);
  const [nineties, setNineties] = useState([]);
  const [latest, setLatest] = useState([]);

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

    async function loadTwenties() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&primary_release_date.gte=2000-02-02&primary_release_date.lte=2010-02-02&include_adult=false'
        );
        const data = await response.json();
        setTwenties(data.results);

      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function loadNineties() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&primary_release_date.gte=1990-01-01&primary_release_date.lte=2000-01-01&include_adult=false'
        );
        const data = await response.json();
        setNineties(data.results);

      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function loadLatest() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US&page=1'
        );
        const data = await response.json();
        setLatest(data.results);

      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    loadTopRated();
    loadTwenties();
    loadLatest();
    loadNineties();

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
    <Gradient>
      <ScrollView style={{ flex: 1, paddingVertical: 8, }}>

        <Text variant="titleLarge" style={styles.sectionTitle}>Top Rated Movies, the Best of the best!</Text>
        <FlatList
          style={[styles.topList, styles.list]}
          horizontal
          data={topRated}
          renderItem={renderMovies}
          keyExtractor={(item) => item.id}
        />

        <Text variant="titleLarge" style={styles.sectionTitle}>Journey with me back to 2000's</Text>
        <FlatList
          style={[styles.upcomingList, styles.list]}
          horizontal
          data={twenties}
          renderItem={renderMovies}
          keyExtractor={(item) => item.id}
        />

        <Text variant="titleLarge" style={styles.sectionTitle}>Miss 90's? Check this out!</Text>
        <FlatList
          style={[styles.upcomingList, styles.list]}
          horizontal
          data={nineties}
          renderItem={renderMovies}
          keyExtractor={(item) => item.id}
        />

        <Text variant="titleLarge" style={styles.sectionTitle}>Latest Releases, you don't wanna miss them!</Text>
        <FlatList
          style={[styles.upcomingList, styles.list]}
          horizontal
          data={latest}
          renderItem={renderMovies}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>

    </Gradient>
  );
}