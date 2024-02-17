import {
  View,
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
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {textinputAlignOnRTL} from '../utils/layout';
import TextValidator from './TextValidator';
import {useTheme} from '@react-navigation/native';

const RegExSpecialChar: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/;
const RegExCaptial: RegExp = /[A-Z]/;
const RegExNumeric: RegExp = /[a-zA-Z0-9]/;

interface PasswordInputProps extends TextInputProps {
  onSubmitText: (text: string, isValid: boolean) => void;
}

const PasswordInput = ({onSubmitText, ...args}: PasswordInputProps) => {
  const tw = useTailwind();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // extras
  const [isValidLength, setIsValidLength] = useState<boolean>(false);
  const [isAlphaNumeric, setIsAlphaNumeric] = useState<boolean>(false);
  const [hasCapitalLetter, setHasCapitalLetter] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const isPassFieldValid =
    isValidLength && isAlphaNumeric && hasCapitalLetter && hasSpecialChar;
  const validate = (text: string) => {
    const checkValidLength: boolean = text.length >= 8 && text.length <= 15;
    const checkAlphaNumeric: boolean = RegExNumeric.test(text);
    const checkCapitalLetter: boolean = RegExCaptial.test(text);
    const checkSpecialChar: boolean = RegExSpecialChar.test(text);

    setIsValidLength(checkValidLength);
    setIsAlphaNumeric(checkAlphaNumeric);
    setHasCapitalLetter(checkCapitalLetter);
    setHasSpecialChar(checkSpecialChar);
  };

  const openModal = (): void => {
    setVisible(true);
  };
  const closeModal = (): void => {
    setVisible(false);
    inputRef?.current?.blur();
    onSubmitText(value, isPassFieldValid);
  };
  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  const handleTextInput = (text: string): void => {
    setValue(text);
    validate(text);
  };

  const toggleShow = () => {
    setShowPassword(prevState => !prevState);
  };

  const viewBorderColor: HEX = isPassFieldValid ? '#f0af0cfd' : colors.error;

  return (
    <>
      <Pressable
        style={[styles.container, {borderColor: viewBorderColor}]}
        onPress={openModal}>
        <Feather name="lock" size={18} color={'white'} />
        <TextInput
          pointerEvents={'none'}
          editable={false}
          style={styles.mainTextInput}
          value={args.value}
          placeholder={t('login.password')}
          secureTextEntry
          placeholderTextColor={'grey'}
        />
      </Pressable>
      <Modal visible={visible} transparent>
        <KeyboardAvoidingView style={styles.keyboardview} behavior="padding">
          <BlurView
            style={tw('absolute top-0 bottom-0 right-0 left-0')}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <TextValidator
            title={t('login.hasLimitChars')}
            isValid={isValidLength}
          />
          <TextValidator
            title={t('login.hasAlphaNumericChar')}
            isValid={isAlphaNumeric}
          />
          <TextValidator
            title={t('login.hasCapitalLetter')}
            isValid={hasCapitalLetter}
          />
          <TextValidator
            title={t('login.hasSpecialChar')}
            isValid={hasSpecialChar}
          />
          <View style={[styles.container, {borderColor: viewBorderColor}]}>
            <Pressable onPress={toggleShow}>
              <Feather name={!showPassword ? 'unlock' : 'lock'} size={18} />
            </Pressable>
            <TextInput
              value={value}
              secureTextEntry={showPassword}
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

export default PasswordInput;

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
    zIndex: 2,
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
