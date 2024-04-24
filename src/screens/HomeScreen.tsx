import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { PanResponderGestureState, Image } from 'react-native';
import {
  fetchRemindItem,
  postConfirmation,
  postProblem,
} from '../services/Service';
import styles from '../styles/screens/HomeScreen.style';
import { LinearGradient } from 'expo-linear-gradient';
import { RandomColors } from '../utils/ColorThemes';
import { specificImageInfo } from '../utils/CharacterAnimationPictures';
import { CharaAnimation } from '../components/CharaAnimation';

import {
  useFonts,
  DelaGothicOne_400Regular,
} from '@expo-google-fonts/dela-gothic-one';

const ANGLE_THRESHOLD = 120;

const TinderAnimation: React.FC = () => {
  const screen = Dimensions.get('window');
  const [animationManager] = useState(new Animated.ValueXY());

  const [remindItemStates, setRemindItemStates] = useState<RemindItem[]>([]);
  const [charaAnimationMode, setCharaAnimationMode] = useState(0);
  const [isLook, setIsLook] = useState<boolean>(false);
  const [childRefs, setChildRefs] = useState<React.RefObject<any>[]>([]);

  let [fontsLoaded] = useFonts({
    DelaGothicOne_400Regular,
  });

  const RenderCharacterInfo = React.useMemo(
    () => (props: any) => {
      return (
        <>
          <Image
            key={props.character.id}
            style={styles.cardImage}
            source={{ uri: `data:image/png;base64,${props.character.source}` }}
          />
          <LinearGradient
            style={[styles.cardImage, { opacity: isLook ? 0 : 0.5 }]}
            colors={[
              RandomColors[props.character.colorNumber].startColor,
              RandomColors[props.character.colorNumber].endColor,
            ]}
            start={{ x: 1, y: 0.0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.6, 1]}
          />
          <Image
            source={specificImageInfo[props.number]} // 画像のパスを指定
            style={[
              styles.cardChara,
              {
                width: screen.width * 0.3,
                height: screen.width * 0.3,
                top: -screen.width * 0.15,
              },
            ]}
          />
          <Image
            style={[
              styles.lookButton,
              {
                top: screen.width * 0.6,
              },
            ]}
          />
        </>
      );
    },
    [remindItemStates, isLook],
  );

  const createPanResponder = (character: RemindItem) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        Animated.event(
          [null, { dx: animationManager.x, dy: animationManager.y }],
          {
            useNativeDriver: false,
          },
        )(event, gestureState);
        setCharaAnimationMode(
          gestureState.dx > 0 ? 1 : gestureState.dx < 0 ? 2 : 0,
        );
      },
      onPanResponderRelease: (
        _: any,
        gestureState: PanResponderGestureState,
      ) => {
        if (
          gestureState.dx > ANGLE_THRESHOLD ||
          gestureState.dx < -ANGLE_THRESHOLD
        ) {
          if (gestureState.dx > ANGLE_THRESHOLD) {
            postConfirmation(character);
          }

          if (gestureState.dx < -ANGLE_THRESHOLD) {
            postProblem(character);
          }

          // カードを元の位置に戻すアニメーション
          Animated.timing(animationManager, {
            toValue: {
              x: gestureState.dx + gestureState.moveX,
              y: screen.height,
            }, // 画面外の位置まで移動
            duration: 500, // アニメーションの持続時間
            useNativeDriver: false,
          }).start(() => {
            outOfFrame(character.id);
            setCharaAnimationMode(0);
            console.log('OK');
            animationManager.setValue({ x: 0, y: 0 });
            setIsLook(false);
          });
        } else {
          Animated.spring(animationManager, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          setCharaAnimationMode(0);
        }
      },
    });
  };

  const rotateCard = animationManager.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const animatedStyle = {
    transform: [
      { translateX: animationManager.x },
      { translateY: animationManager.y },
      { rotate: rotateCard },
    ],
  };

  const RenderCards = React.useMemo(() => {
    return () => {
      return (
        remindItemStates &&
        remindItemStates.map((character, index) =>
          index === remindItemStates.length - 1 ? (
            <Animated.View
              {...createPanResponder(character).panHandlers}
              key={character.id}
              style={[animatedStyle]}
            >
              <View>
                <RenderCharacterInfo character={character as RemindItem} />
                <TouchableOpacity
                  onPress={() => {
                    setIsLook(!isLook);
                  }}
                  style={[
                    styles.lookButton,
                    {
                      top: screen.width * 0.6,
                      width: screen.width * 0.2,
                      height: screen.width * 0.2,
                    },
                  ]}
                >
                  <Image
                    source={
                      isLook
                        ? require('../../assets/yokumiruEnable.png')
                        : require('../../assets/yokumiru.png')
                    }
                    style={{
                      width: screen.width * 0.2,
                      height: 'auto',
                      aspectRatio: 48 / 41,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <CharaAnimation number={charaAnimationMode} screen={screen} />
              <Text
                style={{
                  position: 'absolute',
                  top: screen.width * 0.3,
                  width: screen.width * 0.9,
                  fontSize: 48,
                  color: RandomColors[character.colorNumber].charaColor,
                  fontFamily: fontsLoaded ? 'DelaGothicOne_400Regular' : undefined,
                  display: isLook ? 'none' : 'flex',
                  textAlign: 'center',
                }}
              >
                あああ
              </Text>
            </Animated.View>
          ) : (
            <>
              <RenderCharacterInfo character={character as RemindItem} />
              <CharaAnimation number={0} screen={screen} />
              <Image
                source={require('../../assets/yokumiru.png')}
                style={[
                  styles.lookButton,
                  {
                    top: screen.width * 0.6,
                    width: screen.width * 0.2,
                    height: screen.width * 0.2,
                  },
                ]}
              />
            </>
          ),
        )
      );
    };
  }, [remindItemStates, charaAnimationMode, isLook]);

  useEffect(() => {
    // APIから確認リストを取得する
    const fetchData = async () => {
      const fetchedRemindItem = await fetchRemindItem();
      fetchedRemindItem.forEach((item) => {
        item.colorNumber = Math.floor(Math.random() * RandomColors.length);
      });
      setRemindItemStates(fetchedRemindItem);
      const refs = Array(remindItemStates.length)
        .fill(0)
        .map((i) => React.createRef());
      setChildRefs(refs);
    };
    fetchData();
  }, []);

  // TinderCardが画面外に移動したら発動
  const outOfFrame = (id: number) => {
    console.log(id + ' left the screen!');
    // 該当のTinderCardを削除
    setRemindItemStates((prevState) =>
      prevState.filter((character) => character.id !== id),
    );
  };

  return (
    <View
      style={[styles.container, { width: screen.width, height: screen.height }]}
    >
      <View style={[{ width: screen.width * 0.9, height: screen.width * 0.9 }]}>
        {RenderCards()}
      </View>
    </View>
  );
};

export default TinderAnimation;
