import {useEffect} from 'react';
import {isRTL} from '../utils/layout';
import {useTranslation} from 'react-i18next';

export const useChangeLanguage = () => {
  const {i18n} = useTranslation();

  useEffect(() => {
    if (isRTL) {
      i18n.changeLanguage('ar');
    } else {
      i18n.changeLanguage('en');
    }
  }, [isRTL]);
};
