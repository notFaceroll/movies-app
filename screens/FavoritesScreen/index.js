import { useContext } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FavoritesContext } from "../../store/favorites-context";

export default function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <View>
      <Text>My Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text>You don't have any favorites, go add some movies!</Text>
      )}
    </View>
  );
}