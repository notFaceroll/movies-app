import { useContext } from "react";
import { Text, View } from "react-native";
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
        <Text>You don't have any favorites, go add some movies!</Text>
      )}
    </Gradient>
  );
}