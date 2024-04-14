import React, { useEffect, useState } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';
import { PanResponderGestureState, Image } from 'react-native';
import { fetchRemindItem } from '../services/Service';
import styles from '../styles/screens/HomeScreen.style';

const TinderAnimation: React.FC = () => {
  const [remindItemStates, setRemindItemStates] = useState<RemindItem[]>([]);
  const [childRefs, setChildRefs] = useState<React.RefObject<any>[]>([]);

  const screen = Dimensions.get('window');
  const [nowSpecificImageInfo, setNowSpecificImageInfo] = useState(0);
  const specificImageInfo = require('../../assets/chara/GF1.png');
  const specificImageInfo2 = require('../../assets/chara/GF2.png');
  const specificImageInfo3 = require('../../assets/chara/GF3.png');

  const [pan] = useState(new Animated.ValueXY());
  const createPanResponder = (id: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(event, gestureState);
        console.log(gestureState.dx);
        setNowSpecificImageInfo(
          gestureState.dx > 0 ? 1 : gestureState.dx < 0 ? 2 : 0,
        );
      },
      onPanResponderRelease: (
        _: any,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dx > 120 || gestureState.dx < -120) {
          // カードを元の位置に戻すアニメーション
          Animated.timing(pan, {
            toValue: {
              x: gestureState.dx + gestureState.moveX,
              y: screen.height,
            }, // 画面外の位置まで移動
            duration: 500, // アニメーションの持続時間
            useNativeDriver: false,
          }).start(() => {
            outOfFrame(id);
            setNowSpecificImageInfo(0);
            console.log('OK');
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          setNowSpecificImageInfo(0);
        }
      },
    });
  };

  const rotateCard = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const animatedStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { rotate: rotateCard },
    ],
  };

  const RenderCards = React.useMemo(() => {
    return () => {
      return remindItemStates.map((character, index) =>
        index === remindItemStates.length - 1 ? (
          <Animated.View
            {...createPanResponder(character.id).panHandlers}
            key={character.id}
            style={[animatedStyle]}
          >
            <Image style={styles.cardImage} source={{ uri: character.url }} />
            {nowSpecificImageInfo == 0 && (
              <Image
                source={specificImageInfo} // 画像のパスを指定
                style={[
                  styles.cardChara,
                  {
                    width: screen.width * 0.3,
                    height: screen.width * 0.3,
                    top: -screen.width * 0.15,
                  },
                ]}
              />
            )}
            {nowSpecificImageInfo == 1 && (
              <Image
                source={specificImageInfo2} // 画像のパスを指定
                style={[
                  styles.cardChara,
                  {
                    width: screen.width * 0.3,
                    height: screen.width * 0.3,
                    top: -screen.width * 0.15,
                  },
                ]}
              />
            )}
            {nowSpecificImageInfo == 2 && (
              <Image
                source={specificImageInfo3} // 画像のパスを指定
                style={[
                  styles.cardChara,
                  {
                    width: screen.width * 0.3,
                    height: screen.width * 0.3,
                    top: -screen.width * 0.15,
                  },
                ]}
              />
            )}
          </Animated.View>
        ) : (
          <>
            <Image
              key={character.id}
              style={styles.cardImage}
              source={{ uri: character.url }}
            />
            <Image
              source={specificImageInfo} // 画像のパスを指定
              style={[
                styles.cardChara,
                {
                  width: screen.width * 0.3,
                  height: screen.width * 0.3,
                  top: -screen.width * 0.15,
                },
              ]}
            />
          </>
        ),
      );
    };
  }, [remindItemStates, nowSpecificImageInfo]);

  useEffect(() => {
    // APIから確認リストを取得する
    const fetchData = async () => {
      const fetchedRemindItem = await fetchRemindItem();
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
