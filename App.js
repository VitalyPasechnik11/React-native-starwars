import { Text, View } from 'react-native';

import store from './store';
import { Provider } from 'react-redux';

import './App';

import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <Navigation />
  );
}

