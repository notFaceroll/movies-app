import { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import GridTile from "../components/GridTile";
import Carousel from 'react-native-reanimated-carousel';

export default function HomeScreen() {
  const [topRated, setTopRated] = useState([]);
  const width = Dimensions.get('window').width;

  useEffect(() => {
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

    loadTopRated();
  }, [])

  function renderTopRatedMovie({ item }) {
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
    <View style={{ flex: 1 }}>
      <Text>Top Rated Movies</Text>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={false}
        data={topRated}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={renderTopRatedMovie}
        // renderItem={({ index, item }) => (
        //   <View
        //     style={{
        //       flex: 1,
        //       borderWidth: 1,
        //       justifyContent: 'center',
        //       width: '80%',
        //       marginRight: 'auto',
        //       marginLeft: 'auto',
        //     }}
        //   >
        //     <Text style={{ textAlign: 'center', fontSize: 30 }}>
        //       {item.title}
        //     </Text>
        //   </View>
        // )}
      />
    </View>
  );
}