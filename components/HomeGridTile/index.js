import { Dimensions, StyleSheet } from "react-native";
import { Button, Card, Text } from 'react-native-paper';
import { styles } from "./styles";

export default function HomeGridTile({ title, onPress, poster }) {
  const imagePath = `https://image.tmdb.org/t/p/w342/${poster}`

  return (
    <Card
      mode='outlined'
      onPress={onPress}
      style={styles.card}
    >
      <Card.Cover style={{ height: '80%' }} source={{ uri: imagePath }} />
      {/* <Card.Title title={title} subtitle="Card Subtitle" /> */}
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  )
}

// const width = Dimensions.get('screen').width;
// const styles = StyleSheet.create({
//   card: {
//     height: 400,
//     width: width / 2,
//     marginHorizontal: 4
//   }
// })