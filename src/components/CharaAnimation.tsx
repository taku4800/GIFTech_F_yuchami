import styles from '../styles/screens/HomeScreen.style';
import { Image } from 'react-native';
import { specificImageInfo } from '../utils/CharacterAnimationPictures';

export const CharaAnimation = (props: any) => {
  return (
    <Image
      source={specificImageInfo[props.number]} // 画像のパスを指定
      style={[
        styles.cardChara,
        {
          width: props.screen.width * 0.3,
          height: props.screen.width * 0.3,
          top: -props.screen.width * 0.15,
        },
      ]}
    />
  );
};
