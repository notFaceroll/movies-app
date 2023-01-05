import { Card } from 'react-native-paper';
import { styles } from "./styles";

export default function HomeGridTile({ title, onPress, poster }) {
  const imagePath = `https://image.tmdb.org/t/p/w342/${poster}`

  return (
    <Card
      mode='outlined'
      onPress={onPress}
      style={styles.card}
    >
      <Card.Cover style={styles.cover} source={{ uri: imagePath }} />
    </Card>
  )
}

