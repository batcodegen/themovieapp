import {BlurView} from '@react-native-community/blur';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn';
import Button from '../components/Button';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import {useChangeLanguage} from '../hooks/useChangeLanguage';
import {useLogin} from '../hooks/useLogin';
import {isRTL, toggleLanguage} from '../utils/layout';

const loginBackgroundImg = require('../assets/loginbg.png');
const Login = () => {
  const tw = useTailwind();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const {callLoginApi} = useLogin();
  useChangeLanguage();

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
        onPress={toggleLanguage}>
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
