import { AppState } from 'react-native';
import axios from 'axios';

let lastAppState = AppState.currentState;

export function setupBackgroundHandler() {
  AppState.addEventListener('change', (nextAppState) => {
    if (
      lastAppState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    lastAppState = nextAppState;
  });
}

export function handleAppStateChange(onForeground) {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      onForeground(); // フォアグラウンドになったときのコールバックを実行
    }
  });
  return () => subscription.remove();
}
