import { Image, Pressable, View, Text } from "react-native";
import { styles } from "./styles";

export default function GridTile({ title, onPress, poster }) {
  const imagePath = `https://image.tmdb.org/t/p/w342/${poster}`
  return (
    <View style={styles.gridItem}>
      <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imagePath }} />
        </View>
{/* 
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View> */}
      </Pressable>
    </View>
  )
}

