import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import * as layout2 from '../src/utils/layout';

jest.mock('react-native', () => ({
  I18nManager: {
    isRTL: true,
    forceRTL: jest.fn(),
  },
}));

describe('Test layout file', () => {
  beforeEach(() => jest.resetModules());
  it('isRTL is true when I18nManager.isRTL is true', () => {
    jest.mock('react-native', () => ({
      I18nManager: {
        isRTL: true,
      },
    }));

    const layout = require('../src/utils/layout');
    expect(layout.isRTL).toBe(true);
    expect(layout.textinputAlignOnRTL).toBe('right');
    expect(layout.currentLanguageLocale).toBe('ar-AE');
    expect(layout.alertnateLanguage).toBe('EN');
  });

  it('isRTL is false when I18nManager.isRTL is false', () => {
    jest.mock('react-native', () => ({
      I18nManager: {
        isRTL: false,
      },
    }));
    const layout = require('../src/utils/layout');
    expect(layout.isRTL).toBe(false);
    expect(layout.textinputAlignOnRTL).toBe('left');
    expect(layout.currentLanguageLocale).toBe('en-US');
    expect(layout.alertnateLanguage).toBe('AR');
  });

  it('toggleLanguage switches isRTL', () => {
    layout2.toggleLanguage();

    expect(layout2.isRTL).toBe(true);
    expect(I18nManager.forceRTL).toHaveBeenCalledWith(false);
    expect(layout2.textinputAlignOnRTL).toBe('right');
    expect(layout2.currentLanguageLocale).toBe('ar-AE');
    expect(layout2.alertnateLanguage).toBe('EN');
    expect(RNRestart.restart).toHaveBeenCalled();
  });
});
