import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {Movie} from '../api/popularmovie';
import HIconTitleView from './HIconTitleView';
import {ENDPOINT} from '../api/endpoints';
import {useTheme} from '@react-navigation/native';

interface MovieCardProp {
  image: string;
  id: string;
  title: string;
  rating: number;
  voteCount: number;
  releaseDate: string;
}

const MovieCard = ({
  title,
  rating,
  voteCount,
  id,
  image,
  releaseDate,
}: MovieCardProp) => {
  const {colors} = useTheme();
  return (
    <View style={styles.cardContainer} key={id}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: `${ENDPOINT.IMAGE_BASE_URL}/w500${image}`}}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text
          style={[styles.cardTitle, {color: colors.text}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <HIconTitleView
          title={`${rating.toFixed(1)} (${voteCount})`}
          iconColor="#fdc434"
          iconName={'star'}
        />
        <HIconTitleView title={releaseDate} iconName="calendar" />
      </View>
    </View>
  );
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  cardContainer: {flex: 1, margin: 10},
  cardImage: {width: '100%', borderRadius: 10, aspectRatio: 2 / 3},
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 5,
    textAlign: 'left',
  },
  cardStars: {fontSize: 12, marginTop: 8, marginBottom: 1},
  cardDate: {fontSize: 12, marginTop: 1, marginBottom: 1},
});
