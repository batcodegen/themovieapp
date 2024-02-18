import React from 'react';
import {render, screen} from '@testing-library/react-native';
import TextValidator from '../src/components/TextValidator';

describe('TextValidator component', () => {
  test('renders Login correctly', async () => {
    render(<TextValidator isValid={true} title="test" />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
