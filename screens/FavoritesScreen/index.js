import { useContext } from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper'
import { FlatList } from "react-native-gesture-handler";
import Gradient from "../../components/Gradient";
import { FavoritesContext } from "../../store/favorites-context";
import GridTile from "../../components/GridTile";

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(FavoritesContext);

  function renderFavorites({ item }) {
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
    <Gradient>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavorites}
          numColumns={2}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <Text
            variant="headlineLarge"
            style={{ color: '#ccc', textAlign: 'center' }}
          >
            You don't have any favorites yet.
          </Text>
          <Text
            variant="headlineMedium"
            style={{ color: '#ccc', textAlign: 'center' }}

          >
            Go look for some movies!
          </Text>
        </View>
      )}
    </Gradient>
  );
}