import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
  I18nManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {useTheme} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {useTranslation} from 'react-i18next';
import EmailInput from '../components/EmailInput';
import RNRestart from 'react-native-restart';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isRTL} from '../utils/layout';
import {useLogin} from '../hooks/useLogin';

const loginBackgroundImg = require('../assets/loginbg.png');
const Login = () => {
  const tw = useTailwind();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const {callLoginApi} = useLogin();

  useEffect(() => {
    if (isRTL) {
      i18n.changeLanguage('ar');
    } else {
      i18n.changeLanguage('en');
    }
  }, [isRTL]);

  const checkIsDisabled: boolean = !isValidEmail || !isValidPassword;

  const onAuthenticate = () => {
    callLoginApi(email, password);
  };

  return (
    <ImageBackground
      source={loginBackgroundImg}
      style={[tw('flex-1 bg-opacity-5'), {backgroundColor: colors.primary}]}>
      <BlurView
        style={tw('absolute top-0 bottom-0 right-0 left-0')}
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <Pressable
        style={[styles.langContainer, {top: insets.top + 10}]}
        onPress={() => {
          if (isRTL) {
            I18nManager.forceRTL(false);
          } else {
            I18nManager.forceRTL(true);
          }
          RNRestart.restart();
        }}>
        <Text style={styles.switch}>{isRTL ? 'EN' : 'AR'}</Text>
      </Pressable>
      <View style={styles.container}>
        <Image
          source={require('../assets/applogo.png')}
          style={styles.applogo}
        />
        <Text style={[tw('font-bold text-lg text-center'), styles.title]}>
          THE MOVIE APP
        </Text>
        <EmailInput
          onSubmitText={(text, isValid) => {
            setEmail(text);
            setIsValidEmail(isValid);
          }}
          value={email}
        />
        <PasswordInput
          value={password}
          onSubmitText={(text, isValid) => {
            setPassword(text);
            setIsValidPassword(isValid);
          }}
        />
        <Button
          title={t('login.loginBtn')}
          disabled={checkIsDisabled}
          onButtonPress={onAuthenticate}
        />
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  applogo: {width: 100, height: 100},
  title: {color: '#f0af0cfd'},
  langContainer: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  switch: {fontWeight: 'bold', fontSize: 20, color: 'black'},
});
