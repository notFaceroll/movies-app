import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: height,
  },
  background: {
    flex: 1,
    // height: height,
  },
  imageContainer: {
    width: '80%',
    height: height / 2,
    borderRadius: 16,
    overflow: "hidden",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    marginTop: 8,
    marginBottom: 8,

  },
  title: {
    fontSize: 26,
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  ratingAvg: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 16,
    color: 'white',
  },
  overview: {
    color: 'white',
  }
})