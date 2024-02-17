import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, ar} from './translations';
import AsyncStoragePlugin from 'i18next-react-native-async-storage';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(initReactI18next)
  .use(AsyncStoragePlugin())
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
