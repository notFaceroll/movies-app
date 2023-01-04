import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('screen').width;
export const styles = StyleSheet.create({
  card: {
    height: 400,
    width: width / 2,
    marginHorizontal: 4,
  }
})