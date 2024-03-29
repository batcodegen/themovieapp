import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {TailwindProvider} from 'tailwind-rn';
import AppNavigator from './src/navigation/AppNavigator';
import {peristor, store} from './src/redux/store';
import utilities from './tailwind.json';
import './src/localization/i18n';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <PersistGate loading={null} persistor={peristor}>
          <AppNavigator />
        </PersistGate>
      </TailwindProvider>
    </Provider>
  );
}

export default App;
