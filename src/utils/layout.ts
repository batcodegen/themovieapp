import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

const isRTL: boolean = I18nManager.isRTL;
const textinputAlignOnRTL: 'right' | 'left' = isRTL ? 'right' : 'left';
const currentLanguageLocale: string = isRTL ? 'ar-AE' : 'en-US';
const alertnateLanguage: string = isRTL ? 'EN' : 'AR';

const toggleLanguage = () => {
  if (isRTL) {
    I18nManager.forceRTL(false);
  } else {
    I18nManager.forceRTL(true);
  }
  RNRestart.restart();
};

export {
  isRTL,
  textinputAlignOnRTL,
  currentLanguageLocale,
  alertnateLanguage,
  toggleLanguage,
};
