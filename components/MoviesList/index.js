import { useState, useLayoutEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, FlatList, View, Button } from 'react-native'
import HomeGridTile from '../HomeGridTile';
import MoviesService from '../../services/MoviesService';

import { styles } from './styles';

export default function MoviesList({ collection, section, options }) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigation();

  const loadMovies = useCallback(async () => {
    let moviesToRender;
    setHasError(false);
    try {
      switch (collection) {
        case 'TopRated':
          moviesToRender = await MoviesService.getTopRated();
          setListOfMovies(moviesToRender);
          break;

        case 'Latest':
          moviesToRender = await MoviesService.getLatest();
          setListOfMovies(moviesToRender);
          break;

        case 'Upcoming':
          moviesToRender = await MoviesService.getUpcoming();
          setListOfMovies(moviesToRender);
          break;

        case 'BetweenDates':
          moviesToRender = await MoviesService
            .getFromDate(options.from, options.to);
          setListOfMovies(moviesToRender);
          break;
      }

    } catch (error) {
      console.log(error);
      setHasError(true);
    }
  }, [])


  useLayoutEffect(() => {
    loadMovies();
  }, [loadMovies])

  function renderMovies({ item }) {
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
      />
    );
  }

  return (
    <>
      <Text
        variant="titleLarge"
        style={styles.sectionTitle}
      >
        {section}
      </Text>
      {hasError && (
        <View style={{ flex: 1, height: 400, }}>
          <Text style={{ fontSize: 32, color: '#eeeeee' }}>Something went wrong :&#40;</Text>
          <Text style={{ fontSize: 18, color: '#eeeeee' }}>Check your internet connection and try again!</Text>
          <Button title='Retry' onPress={loadMovies} />
        </View>
      )}
      <FlatList
        style={styles.list}
        horizontal
        data={listOfMovies}
        renderItem={renderMovies}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}