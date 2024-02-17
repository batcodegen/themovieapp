import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onButtonPress: () => void;
}

const Button = ({title, disabled = false, onButtonPress}: ButtonProps) => {
  const bgButtonColor: HEX = disabled ? '#868583' : '#f0af0c';
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: bgButtonColor}]}
      disabled={disabled}
      onPress={onButtonPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: '70%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});
