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
    borderRadius: 80,
    resizeMode: 'cover',
  },
  cardChara: {
    position: 'absolute',
    left: '30%',
    alignItems: 'center',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  lookButton: {
    position: 'absolute',
    left: '40%',
    top: '60%',
    alignItems: 'center',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    left: '40%',
    top: '60%',
    alignItems: 'center',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  pressedLookButton: {
    position: 'absolute',
    left: '40%',
    top: '60%',
    alignItems: 'center',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  norhumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  leftTextNorhumContainer: {
    color: 'white',
    padding: 10,
  },
  rightTextNorhumContainer: {
    color: 'white',
    padding: 10,
  },
});

export default styles;
