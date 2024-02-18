/*
 Horizontal view with title and icon
*/
import {StyleSheet, Text, View} from 'react-native';
import React, {ComponentProps} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';

interface HIconTitleViewProps {
  iconColor?: HEX | string;
  title: String;
  iconName: ComponentProps<typeof Icon>['name'];
}

const HIconTitleView = ({iconColor, title, iconName}: HIconTitleViewProps) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={16} color={iconColor ?? colors.text} />
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
    </View>
  );
};

export default HIconTitleView;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginTop: 2},
  title: {marginStart: 5, textAlign: 'left'},
});
