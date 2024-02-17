import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {ENDPOINT} from './endpoints';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Pagination {
  page: number;
  total_pages: number;
  total_results: number;
}

interface GetPopularMoviesResponse extends Pagination {
  results: Movie[];
}

export const popularMoviesApi = createApi({
  reducerPath: 'popularMovies',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT.BASE_URL,
    prepareHeaders: baseHeaders => {
      baseHeaders.set('Authorization', `Bearer ${Config.TMDB_API_KEY}`);
      return baseHeaders;
    },
  }),
  endpoints: builder => ({
    getPopularMovies: builder.query<
      GetPopularMoviesResponse,
      {language?: string; page?: number}
    >({
      query: ({language, page}) => ({
        url: ENDPOINT.GET_POPULAR_MOVIES,
        params: {language, page},
      }),
    }),
  }),
});

export const {useGetPopularMoviesQuery, useLazyGetPopularMoviesQuery} =
  popularMoviesApi;
