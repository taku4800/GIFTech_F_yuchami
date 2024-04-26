import React from 'react';
import Home from './src/screens/HomeScreen';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs()
  return <Home />;
}
