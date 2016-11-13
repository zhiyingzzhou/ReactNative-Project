import {
  AppRegistry,
} from 'react-native';
import InitialStorage from './js/storage';
import SetUp from './js/setup';
// import Modal from './test/modal'
// import Animated from './test/animated'
InitialStorage();

AppRegistry.registerComponent('shop',() => SetUp );