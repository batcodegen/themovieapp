import {I18nManager} from 'react-native';

const isRTL: boolean = I18nManager.isRTL;
const textinputAlignOnRTL: 'right' | 'left' = isRTL ? 'right' : 'left';
const currentLanguageLocale: string = isRTL ? 'ar-AE' : 'en-US';

export {isRTL, textinputAlignOnRTL, currentLanguageLocale};
