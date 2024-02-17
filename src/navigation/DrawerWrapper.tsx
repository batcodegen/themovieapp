import {useDrawerProgress} from '@react-navigation/drawer';
import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

type DrawerWrapperProps = PropsWithChildren;

const DrawerWrapper = ({children}: DrawerWrapperProps) => {
  const progress = useDrawerProgress();
  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.8], 'clamp');
    return {
      transform: [{scale}],
      overflow: 'hidden',
      borderRadius: interpolate(progress.value, [0, 1], [0, 20], 'clamp'),
    };
  });
  return (
    <Animated.View style={[styles.container, animStyle]}>
      {children}
    </Animated.View>
  );
};

export default DrawerWrapper;

const styles = StyleSheet.create({container: {flex: 1}});
