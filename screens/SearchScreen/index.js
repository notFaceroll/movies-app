import * as React from 'react';
import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styles } from './styles';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [genres, setGenres] = React.useState([]);

  React.useLayoutEffect(() => {
    async function loadGenres() {
      const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4c00770e06a5046da486fdd9a5b221d8&language=en-US');
      const json = await data.json();
      setGenres(json.genres);
    }

    loadGenres();
  }, [])

  const onChangeSearch = query => setSearchQuery(query);
  const width = Dimensions.get('screen').width;

  function renderQuery({ item }) {
    function pressHandler() {
      navigation.navigate('QueryDetails', {
        id: item.id,
      });
    }

    return (
      <View
        style={{
          flex: 1 / 2,
          borderRadius: 8,
          height: width / 4,
          backgroundColor: 'salmon',
          margin: 8,
        }}>
        <Pressable style={{
          flex: 1, alignItems: 'center',
          justifyContent: 'center',
        }} onPress={pressHandler}>
          <Text style={{ color: 'white' }}>{item.name}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Search movies, actors, studios...'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.input}
      />
      <FlatList
        style={{
          width: '100%',
        }}
        data={genres}
        numColumns={2}
        keyExtractor={(item) => item.id}
        // renderItem={({ item }) => (
        //   <View
        //     style={{
        //       flex: 1 / 2,
        //       borderRadius: 8,
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //       // width: width / 2.3,
        //       height: width / 2.3,
        //       margin: 4,
        //       backgroundColor: 'salmon'
        //     }}>
        //     <Text style={{ color: 'white' }}>{item.name}</Text>
        //   </View>
        // )}
        renderItem={renderQuery}
      />
    </View>
  )
}