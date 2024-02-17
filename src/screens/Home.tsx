import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DrawerWrapper from '../navigation/DrawerWrapper';
import {useTheme} from '@react-navigation/native';
import Header from '../components/Header';
import {FlatList} from 'react-native';
import {useGetPopularMovies} from '../hooks/useGetPopularMovies';
import {Movie} from '../api/popularmovie';
import {Image} from 'react-native';
import {ENDPOINT} from '../api/endpoints';

const Home = () => {
  const {colors} = useTheme();
  const {data, isLoading, isFetching, error, fetchNextPage} =
    useGetPopularMovies();

  const renderMovieCard = ({item}: {item: Movie}) => {
    return (
      <View>
        <Image
          source={{uri: `${ENDPOINT.IMAGE_BASE_URL}/w200${item.poster_path}`}}
          style={{width: 50, height: 80}}
        />
        <Text>{item.title}</Text>
      </View>
    );
  };

  if (isLoading || isFetching) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
        <Header screenName="Popular Movies" />
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovieCard}
        />
        <Text>Home</Text>
      </SafeAreaView>
    </DrawerWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
});
