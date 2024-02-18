import {useEffect, useRef, useState} from 'react';
import {
  Movie,
  useGetPopularMoviesQuery,
  useLazyGetPopularMoviesQuery,
} from '../api/popularmovie';
import {currentLanguageLocale} from '../utils/layout';

export const useGetPopularMovies = () => {
  const [fetchedData, setFetchedData] = useState<Movie[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const isFetchedOnceRef = useRef<boolean>(false);
  const {data, isFetching, isLoading, error} = useGetPopularMoviesQuery({
    language: currentLanguageLocale,
    page: pageNumber,
  });
  const [
    fetchMoreMovies,
    {
      isLoading: isLoadingMoreMovies,
      isFetching: isFetchingMoreMovies,
      error: errorFetchingMoreMovies,
    },
  ] = useLazyGetPopularMoviesQuery();

  useEffect(() => {
    if (data && !isFetchedOnceRef.current) {
      isFetchedOnceRef.current = true;
      const {results, ...otherData} = data;
      setFetchedData(results);
      setPageNumber(otherData.page + 1);
    }
  }, [data]);

  const fetchNextPage = async () => {
    try {
      const response = await fetchMoreMovies({
        language: currentLanguageLocale,
        page: pageNumber,
      });
      if (response.data) {
        const movieData = response.data.results ?? [];
        setFetchedData(prevData => [...prevData, ...movieData]);
        setPageNumber(prevNumber => prevNumber + 1);
      }
    } catch (e) {}
  };

  return {
    data: fetchedData,
    isFetching,
    isFetchingMoreMovies,
    isLoading,
    isLoadingMoreMovies,
    error,
    errorFetchingMoreMovies,
    fetchNextPage,
  };
};
