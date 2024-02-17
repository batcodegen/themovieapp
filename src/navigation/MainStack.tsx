import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import DrawerContent from './DrawerContent';
import {useTheme} from '@react-navigation/native';

export type DrawerStackParamList = {
  Home: undefined;
};

const DrawerStack = createDrawerNavigator<DrawerStackParamList>();

const MainStack = () => {
  const {colors} = useTheme();
  return (
    <DrawerStack.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerType: 'slide',
        // drawerPosition: 'right',
        overlayColor: 'transparent',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        drawerActiveTintColor: colors.textAlt,
        drawerInactiveTintColor: colors.textAlt,
        drawerStyle: {backgroundColor: colors.primary, width: '50%'},
        sceneContainerStyle: {backgroundColor: colors.primary},
      }}>
      <DrawerStack.Screen name="Home" component={Home} />
    </DrawerStack.Navigator>
  );
};

export default MainStack;
