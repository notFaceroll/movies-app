import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons';

export default function MovieDetailsScreen({ route }) {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;

  const api_key = 'api_key=4c00770e06a5046da486fdd9a5b221d8';
  const endPoint = `https://api.themoviedb.org/3/movie/${id}?${api_key}&language=en-US`
  const imagePath = `https://image.tmdb.org/t/p/w342/${movieData.poster_path}`;

  useLayoutEffect(() => {
    setIsLoading(true);
    async function loadMovieDetails() {
      try {
        const response = await fetch(endPoint);
        const data = await response.json();
        console.log(data);
        setMovieData(data);

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadMovieDetails();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagePath }} style={styles.image} />
      </View>
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
          &#40;{movieData?.vote_count}&#41;
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movieData?.title}</Text>
      </View>
      <View>
        <Text>{movieData?.overview}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    width: '80%',
    height: '65%',
    borderRadius: 16,
    overflow: "hidden",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
    elevation: 4,
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
  }
})