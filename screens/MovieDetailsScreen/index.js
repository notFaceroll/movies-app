import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native"
import { FavoritesContext } from "../../store/favorites-context";
import { ActivityIndicator, Card, MD2Colors } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";

import Toast from 'react-native-toast-message';
import MoviesService from "../../services/MoviesService";

export default function MovieDetailsScreen({ route }) {
  const [movieData, setMovieData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { id } = route.params;
  const { favorites, removeMovieFromFavorites, addMovieToFavorites } = useContext(FavoritesContext);

  const isMovieStored = favorites?.find((movie) => movie.id === movieData.id);
  const imagePath = `https://image.tmdb.org/t/p/w342/${movieData.poster_path}`;

  useLayoutEffect(() => {
    setIsLoading(true);
    async function loadMovieDetails() {
      try {
        const movieFound = await MoviesService.getById(id);
        setMovieData(movieFound);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    }
    loadMovieDetails();
  }, [])

  function handleAddToFavorites() {
    addMovieToFavorites(movieData);
    Toast.show({
      type: 'success',
      text1: '✅ Added to favorites',
      position: 'bottom',
      visibilityTime: 2000,
    })
  }

  function handleRemoveFromFavorites() {
    removeMovieFromFavorites(id);
    Toast.show({
      type: 'error',
      text1: '❌ Removed from favorites',
      position: 'bottom',
      visibilityTime: 2000,
    })
  }

  if (hasError) {
    return (
      <LinearGradient
        colors={['#997570', '#351514', '#1E0E0D', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}
      >
        <Text style={{ fontSize: 32, color: '#eeeeee' }}>Something went wrong :&#40;</Text>
        <Text style={{ fontSize: 18, color: '#eeeeee' }}>Check your internet connection and try again!</Text>
        <Ionicons name="wifi-outline" size={46} color="#eee" />
      </LinearGradient>
    )
  }

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#997570', '#351514', '#1E0E0D', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <ActivityIndicator animating={true} color={MD2Colors.white} size="large" />
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={['#997570', '#351514', '#1E0E0D', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
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
          <Pressable
            onPress={isMovieStored ? handleRemoveFromFavorites : handleAddToFavorites}
            style={{ marginLeft: 'auto' }}
          >
            <Ionicons name={isMovieStored ? "heart" : "heart-outline"} size={24} color="red" />
          </Pressable>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{movieData?.title}</Text>
          <Text style={{ color: '#cccc' }}>{movieData?.release_date}</Text>
        </View>

        <ScrollView>
          <Text style={styles.overview}>{movieData?.overview}</Text>
        </ScrollView>

      </View>
    </LinearGradient>
  );
}
