import {useColorScheme} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import {DarkTheme, LightTheme} from '../theme/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import MainStack from './MainStack';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const scheme = useColorScheme();
  const isLoggedIn = useSelector<RootState>(state => state.auth.isLoggedIn);
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <RootStack.Navigator>
        {isLoggedIn ? (
          <RootStack.Group screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Main" component={MainStack} />
          </RootStack.Group>
        ) : (
          <RootStack.Group screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Login" component={Login} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
