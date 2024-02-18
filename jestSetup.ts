import {NativeModules as RNNativeModules} from 'react-native';
import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.useFakeTimers();
RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule =
  RNNativeModules.RNGestureHandlerModule || {
    State: {BEGAN: 'BEGAN', FAILED: 'FAILED', ACTIVE: 'ACTIVE', END: 'END'},
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
  };
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
};

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// mock Async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

// jest.mock('react-native-safe-area-context', () => {
//   const inset = {top: 0, right: 0, bottom: 0, left: 0};
//   return {
//     SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
//     SafeAreaConsumer: jest
//       .fn()
//       .mockImplementation(({children}) => children(inset)),
//     SafeAreaView: jest.fn().mockImplementation(({children}) => children),
//     useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
//   };
// });
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
  useTheme: () => ({colors: {primary: '#000'}}),
}));

jest.mock('@react-navigation/drawer', () => ({
  useDrawerProgress: () => ({navigate: mockedNavigate}),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));

// const React = require('react-native');
// React.I18nManager = {
//   isRTL: false,
//   allowRTL: () => {},
//   forceRTL: () => {},
// };
