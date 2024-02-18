import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import React, {ComponentProps, memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FontA from 'react-native-vector-icons/FontAwesome';
import {alertnateLanguage, toggleLanguage} from '../utils/layout';
import {useTranslation} from 'react-i18next';
import {useLogin} from '../hooks/useLogin';

interface DisplayIconProps {
  name: ComponentProps<typeof FontA>['name'];
}

const DisplayIcon = memo(({name}: DisplayIconProps) => {
  const {colors} = useTheme();
  return <FontA name={name} size={20} color={colors.textAlt} />;
});

const DrawerContent = ({...props}) => {
  const {navigation} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {callLogoutApi} = useLogin();

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
        label={`${t('home.changeTo')} ${alertnateLanguage}`}
        labelStyle={[styles.margin, {color: colors.textAlt}]}
        icon={() => <DisplayIcon name="language" />}
        onPress={() => {
          navigation?.closeDrawer();
          toggleLanguage();
        }}
      />
      <DrawerItem
        label={t('home.logout')}
        style={styles.shareContainer}
        labelStyle={[styles.margin, {color: colors.textAlt}]}
        icon={() => <DisplayIcon name="power-off" />}
        onPress={() => {
          callLogoutApi();
        }}
      />
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
  margin: {marginStart: -20},
});
