import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Container } from "./styles";

export default function GridTile({ title, onPress, poster }) {
  const imagePath = `https://image.tmdb.org/t/p/w342/${poster}`
  return (
    <Container>
      <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagePath }} style={styles.image} />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </Container>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    height: '20%',
    paddingTop: 4,
    paddingLeft: 8,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  }
})