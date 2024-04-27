import React, { useState, useEffect } from 'react';
import Home from './src/screens/HomeScreen';
import { setupBackgroundHandler, handleAppStateChange } from './src/backgrounds/BackgroundHandler';
import { LogBox, AppState } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs();
  const [appKey, setAppKey] = useState(0);

  useEffect(() => {
    setupBackgroundHandler();
    const unsubscribe = handleAppStateChange(() => {
      setAppKey(prevKey => prevKey + 1); // アプリがフォアグラウンドに戻ったときにキーを更新
    });
    return unsubscribe; // クリーンアップ関数として返す
  }, []);

  return <Home key={appKey} />;
}
