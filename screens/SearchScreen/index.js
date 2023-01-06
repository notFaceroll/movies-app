import * as React from 'react';
import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
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

  function handleSubmitSearch() {
    navigation.navigate('QueryDetails', {
      query: searchQuery,
    })
  }

  function renderQuery({ item }) {
    function pressHandler() {
      navigation.navigate('QueryDetails', {
        id: item.id,
        name: item.name,
      });
    }

    return (
      <Animated.View
        entering={FadeInDown}
        style={{
          flex: 1 / 2,
          borderRadius: 8,
          height: width / 4,
          backgroundColor: '#BFA5A3',
          margin: 8,
        }}>
        <Pressable style={{
          flex: 1, alignItems: 'center',
          justifyContent: 'center',
        }} onPress={pressHandler}>
          <Text style={{ color: '#000', fontSize: 18 }}>{item.name}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Search your movies here!'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.inputContainer}
        inputStyle={styles.input}
        onIconPress={handleSubmitSearch}
        onSubmitEditing={handleSubmitSearch}
      />
      <FlatList
        style={{
          width: '100%',
        }}
        data={genres}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderQuery}
      />
    </View>
  )
}