import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AsyncStore from './components/AsyncStore';

AppRegistry.registerComponent(appName, () => App);
