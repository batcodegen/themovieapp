import React, {PropsWithChildren, ReactElement} from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store as mainStore} from '../../src/redux/store';

type Wrapper = PropsWithChildren;

export function renderWithProviders(
  ui: ReactElement,
  {preloadedState: {} = {}, store = mainStore, ...renderOptions} = {},
) {
  function Wrapper({children}: Wrapper) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
