import styles from '../styles/screens/HomeScreen.style';
import { Image } from 'react-native';
import { specificImageInfo } from '../utils/CharacterAnimationPictures';

export const CharaAnimation = (props: any) => {
  let num: number = 0;
  if (props.isInit) {
    num = props.theme.charaType * 10 + props.koma;
  } else if (props.mode == 0) {
    num = props.theme.charaType * 10 + 3;
  } else {
    num = props.theme.charaType * 10 + 3 + props.mode * 3 - 2 + props.koma;
  }

  console.log(num);

  return (
    <Image
      source={specificImageInfo[num]} // 画像のパスを指定
      style={[
        styles.cardChara,
        {
          width: props.screen.width * 0.4,
          height: props.screen.width * 0.4,
          top: -props.screen.width * 0.15,
        },
      ]}
    />
  );
};
