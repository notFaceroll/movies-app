import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { Card } from "react-native-paper";

export default function GridTile({ title, onPress, poster }) {
  const imagePath = `https://image.tmdb.org/t/p/w342/${poster}`
  return (
    <Card style={styles.gridItem}>
      <Pressable style={styles.button} onPress={onPress}>
        <Card.Cover source={{ uri: imagePath }} />
        <Card.Title title={title} />
        {/* <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View> */}
      </Pressable>
    </Card>
  )
}

