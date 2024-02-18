import {act, renderHook, waitFor} from '@testing-library/react-native';

jest.mock('../src/utils/layout', () => ({
  currentLanguageLocale: 'en-US',
}));

describe('useGetPopularMovies hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render the initial data', async () => {
    // Mock data for the initial query
  });
});
