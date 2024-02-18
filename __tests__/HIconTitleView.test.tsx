import React from 'react';
import {render, screen} from '@testing-library/react-native';
import HIconTitleView from '../src/components/HIconTitleView';

describe('HIconTitleView Component', () => {
  it('Renders correctly', () => {
    render(<HIconTitleView iconName="menu" title={'title'} iconColor="#fff" />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
