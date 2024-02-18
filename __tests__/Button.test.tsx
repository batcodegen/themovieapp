import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Button from '../src/components/Button';

describe('Login', () => {
  test('renders Login correctly', async () => {
    const mockButtonPress = jest.fn();
    render(
      <Button onButtonPress={mockButtonPress} title="abc" disabled={false} />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
