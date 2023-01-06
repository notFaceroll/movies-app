import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gridItem: {
    margin: 12,
    flex: 1 / 2,
    height: 300,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cccccc',
    elevation: 4,
  },

  button: {
    flex: 1,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#cccccc'
  },

  imageContainer: {
    flex: 2,
  },

  image: {
    flex: 1,
  },

  content: {
    // flex: 1,
    height: '20%',
    backgroundColor: '#131313',
    justifyContent: 'center',
    alignItems: 'center',
  }
})