import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import { FavoritesContext } from "../../store/favorites-context";
import { Card } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";


export default function MovieDetailsScreen({ route }) {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { addMovieToFavorites } = useContext(FavoritesContext);
  const { id } = route.params;

  const { favorites, removeMovieFromFavorites } = useContext(FavoritesContext);

  const isMovieStored = favorites?.find((movie) => movie.id === movieData.id);

  const api_key = 'api_key=4c00770e06a5046da486fdd9a5b221d8';
  const endPoint = `https://api.themoviedb.org/3/movie/${id}?${api_key}&language=en-US`
  const imagePath = `https://image.tmdb.org/t/p/w342/${movieData.poster_path}`;

  useLayoutEffect(() => {
    setIsLoading(true);
    async function loadMovieDetails() {
      try {
        const response = await fetch(endPoint);
        const data = await response.json();
        setMovieData(data);

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadMovieDetails();
  }, [])

  function handleAddToFavorites() {
    addMovieToFavorites(movieData);
  }

  function handleRemoveFromFavorites() {
    removeMovieFromFavorites(id);
  }

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={['#997570','#351514', '#1E0E0D', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
        style={styles.background}
      >

        <View style={styles.container}>
          <Card mode="outlined" style={styles.imageContainer}>
            <Card.Cover source={{ uri: imagePath }} style={styles.image} />
          </Card>
          <View style={styles.ratingContainer}>
            <Ionicons
              name="star"
              size={24}
              color="yellow"
              style={styles.icon}
            />
            <Text style={styles.ratingAvg}>
              {movieData?.vote_average?.toFixed(2)}
            </Text>
            <Text style={styles.ratingCount}>
              &#40;{movieData?.vote_count} reviews&#41;
            </Text>

            {isMovieStored && (
              <Pressable
                onPress={handleRemoveFromFavorites}
                style={{ marginLeft: 'auto' }}
              >
                <Ionicons name="trash-bin" size={24} color="white" />
              </Pressable>
            )}

            <Pressable
              onPress={handleAddToFavorites}
              style={{ marginLeft: 'auto' }}
              disabled={isMovieStored}
            >
              <Ionicons name="heart" size={24} color="red" />
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{movieData?.title}</Text>
          </View>
          <View>
            <Text style={styles.overview}>{movieData?.overview}</Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    // backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  background: {
    flex: 1,
  },
  imageContainer: {
    width: '80%',
    height: '65%',
    borderRadius: 16,
    overflow: "hidden",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
    // elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    marginTop: 8,
    marginBottom: 8,

  },
  title: {
    fontSize: 26,
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  ratingAvg: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 16,
    color: 'white',
  },
  overview: {
    color: 'white',
  }
})