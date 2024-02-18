import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Header from '../src/components/Header';

describe('Header Component', () => {
  it('Renders correctly', () => {
    render(<Header screenName="Popular Movies" />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
