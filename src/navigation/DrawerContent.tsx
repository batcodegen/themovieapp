import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FontA from 'react-native-vector-icons/FontAwesome';

const DrawerContent = ({...props}) => {
  const {navigation} = props;
  const {colors} = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.mainContainer}>
      <View
        style={[
          styles.container,
          {
            borderBottomColor: colors.textAlt,
          },
        ]}>
        <Image
          source={require('../assets/applogo.png')}
          style={styles.appimage}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.appTitle,
            {
              color: colors.textAlt,
            },
          ]}>
          {'THE MOVIE APP'}
        </Text>
      </View>
      <DrawerItem
        label={'Change'}
        labelStyle={{color: colors.textAlt, marginStart: -20}}
        icon={() => (
          <FontA name={'language'} size={20} color={colors.textAlt} />
        )}
        onPress={() => {
          navigation?.closeDrawer();
          // Handle language change
        }}
      />
      <DrawerItem
        label={'Logout'}
        style={styles.shareContainer}
        labelStyle={{color: colors.textAlt}}
        icon={() => (
          <FontA name={'power-off'} size={20} color={colors.textAlt} />
        )}
        onPress={() => {
          console.log('logout');
        }}
      />
      {/* <Logout /> */}
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  appimage: {width: 40, height: 40},
  appTitle: {
    fontWeight: 'bold',
    marginStart: 10,
    fontSize: 16,
  },
  shareContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
  },
});
