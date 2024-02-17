import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextValidatorProps {
  isValid: boolean;
  title: string;
}

const TextValidator = ({isValid, title}: TextValidatorProps) => {
  return (
    <View style={styles.container}>
      <Icon
        name={
          isValid
            ? 'checkbox-marked-circle-outline'
            : 'checkbox-blank-circle-outline'
        }
        size={20}
        color={isValid ? '#1fee3e' : 'gray'}
      />
      <Text style={[styles.validationText, isValid && styles.strikethrough]}>
        {title}
      </Text>
    </View>
  );
};

export default TextValidator;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', width: '70%'},
  validationText: {color: 'white', marginHorizontal: 10},
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'gray',
    textDecorationStyle: 'solid',
  },
});
