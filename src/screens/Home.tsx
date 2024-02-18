import {useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../api/popularmovie';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import {useChangeLanguage} from '../hooks/useChangeLanguage';
import {useGetPopularMovies} from '../hooks/useGetPopularMovies';
import DrawerWrapper from '../navigation/DrawerWrapper';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  useChangeLanguage();
  const {data, error, fetchNextPage, isLoadingMoreMovies} =
    useGetPopularMovies();

  const renderMovieCard = ({item}: {item: Movie}) => {
    return (
      <MovieCard
        id={item.id.toString()}
        image={item.poster_path}
        rating={item.vote_average}
        releaseDate={item.release_date}
        title={item.original_title}
        voteCount={item.vote_count}
      />
    );
  };

  const renderFooter = useCallback(() => {
    if (isLoadingMoreMovies) {
      return <Text style={styles.loadingMore}>Loading More...</Text>;
    }
    return <View />;
  }, [isLoadingMoreMovies]);

  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <DrawerWrapper>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Header screenName={t('home.popularMovies')} />
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovieCard}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          bounces={false}
          initialNumToRender={20}
          removeClippedSubviews={true}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </DrawerWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  loadingMore: {textAlign: 'center'},
});
