import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation, useTheme} from '@react-navigation/native';
import {Pressable} from 'react-native';

interface HeaderProps {
  screenName: string;
}

const Header = ({screenName}: HeaderProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={30} color={colors.text} />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, {color: colors.text}]}>
          {screenName}
        </Text>
      </View>
      <View style={styles.rightContainer} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  iconContainer: {flex: 0.2, alignItems: 'flex-start'},
  titleContainer: {flex: 0.6, alignItems: 'center'},
  titleText: {fontSize: 18, fontWeight: 'bold', letterSpacing: 0.2},
  rightContainer: {flex: 0.2},
});
