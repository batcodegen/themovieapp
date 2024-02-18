import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {BlurView} from '@react-native-community/blur';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useTranslation} from 'react-i18next';
import {textinputAlignOnRTL} from '../utils/layout';
import isEmail from 'validator/lib/isEmail';
import {useTheme} from '@react-navigation/native';

interface EmailInputProps extends TextInputProps {
  onSubmitText: (text: string, isValid: boolean) => void;
}

const EmailInput = ({onSubmitText, ...args}: EmailInputProps) => {
  const tw = useTailwind();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

  const openModal = (): void => {
    setVisible(true);
  };
  const closeModal = (): void => {
    setVisible(false);
    inputRef?.current?.blur();
    onSubmitText(value, isValidEmail);
  };
  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  const handleTextInput = (text: string): void => {
    setIsValidEmail(isEmail(text));
    setValue(text);
  };
  const viewBorderColor = isValidEmail ? '#f0af0cfd' : colors.error;
  return (
    <>
      <Pressable
        testID="email-open-button"
        style={[styles.container, {borderColor: viewBorderColor}]}
        onPress={openModal}>
        <Fontisto name="email" size={18} color={'white'} />
        <TextInput
          pointerEvents={'none'}
          editable={false}
          style={styles.mainTextInput}
          value={args.value}
          placeholder={t('login.email')}
          placeholderTextColor={'grey'}
        />
      </Pressable>
      <Modal testID="email-modal" visible={visible} transparent>
        <KeyboardAvoidingView style={styles.keyboardview} behavior="padding">
          <BlurView
            style={tw('absolute top-0 bottom-0 right-0 left-0')}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          {!isValidEmail && value.length > 0 && (
            <Text style={{color: colors.error}}>{'Invalid email'}</Text>
          )}
          <View style={styles.container}>
            <Fontisto name="email" size={18} />
            <TextInput
              testID="email-text-input"
              value={value}
              onBlur={closeModal}
              onChangeText={handleTextInput}
              ref={inputRef}
              style={[tw('mx-5'), styles.mainTextInput]}
              onSubmitEditing={closeModal}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default EmailInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  mainTextInput: {
    padding: 10,
    flex: 1,
    overflow: 'hidden',
    textAlign: textinputAlignOnRTL,
    color: 'white',
  },
  keyboardview: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
