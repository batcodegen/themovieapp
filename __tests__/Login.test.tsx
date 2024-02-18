import React from 'react';
import {screen} from '@testing-library/react-native';
import Login from '../src/screens/Login';
import {renderWithProviders} from './utils/test-utils';

describe('Login', () => {
  test('renders Login correctly', async () => {
    renderWithProviders(<Login />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
