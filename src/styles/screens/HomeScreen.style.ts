import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '90%',
    height: '90%',
  },
  cardHeader: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

export default styles;
