import React from 'react';
import {screen} from '@testing-library/react-native';
import Home from '../src/screens/Home';
import {renderWithProviders} from './utils/test-utils';

describe('Home component', () => {
  test('Renders Home correctly', async () => {
    renderWithProviders(<Home />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
