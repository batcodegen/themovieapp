import {useEffect, useState} from 'react';
import {
  Movie,
  useGetPopularMoviesQuery,
  useLazyGetPopularMoviesQuery,
} from '../api/popularmovie';
import {useAppDispatch} from '../redux/store';
import {currentLanguageLocale} from '../utils/layout';

export const useGetPopularMovies = () => {
  const [fetchedData, setFetchedData] = useState<Movie[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const {results, ...otherData} = data;
      setFetchedData(results);
      setPageNumber(otherData.page);
    }
  }, [data, dispatch]);

  const fetchNextPage = async () => {
    const response = await fetchMoreMovies({
      language: currentLanguageLocale,
      page: pageNumber + 1,
    });
    if (response.data) {
      setFetchedData([...fetchedData, ...response.data.results]);
      setPageNumber(prevNumber => prevNumber + 1);
    }
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
