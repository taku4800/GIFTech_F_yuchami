import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardContainer: {
    width: '90%',
    height: '80%',
    paddingTop: '15%',
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 9 / 16,
    overflow: 'hidden',
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

export default styles;
