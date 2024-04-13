import React, { useEffect } from 'react';
import { useState } from 'react';
import { ImageBackground, View, Text, Dimensions } from 'react-native';
import TinderCard from 'react-tinder-card';
import styles from '../styles/screens/HomeScreen.style';
import { fetchRemindItem, postXXA, postXXB } from '../services/Service';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Home() {
  // APIから取得した確認リスト
  const [remindItemStates, setRemindItemStates] = useState<RemindItem[]>([]);
  const [childRefs, setChildRefs] = useState<React.RefObject<any>[]>([]);

  const screen = Dimensions.get('window');

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

  // TinderCardを左右のどちらかにスワイプしたら発動
  const swiped = async (direction: any, id: number) => {
    console.log('removing: ' + id + ' to the ' + direction);
    // directionに応じた送信処理
    switch (direction) {
      case 'left':
        await postXXA();
        break;
      case 'right':
        await postXXB();
        break;
      default:
        break;
    }
  };

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
        {remindItemStates.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={character.id}
            onSwipe={(dir) => swiped(dir, character.id)}
            onCardLeftScreen={() => outOfFrame(character.id)}
          >
            <ImageBackground
              style={styles.cardImage}
              source={{ uri: character.url }}
            />
          </TinderCard>
        ))}
      </View>
    </View>
  );
}
