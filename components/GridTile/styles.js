import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gridItem: {
    flex: 1 / 2,
    margin: 16,
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