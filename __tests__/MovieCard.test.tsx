import React from 'react';
import {render, screen} from '@testing-library/react-native';
import MovieCard from '../src/components/MovieCard';

const props = {
  id: '1',
  image: 'https://example.com',
  rating: 4.5,
  releaseDate: '2024-01-20',
  title: 'Minions',
  voteCount: 123,
};

describe('Header Component', () => {
  it('Renders correctly', () => {
    render(<MovieCard {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
