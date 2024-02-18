import {onLogin, onLogout} from '../src/redux/authReducer';
import {store} from '../src/redux/store';

describe('authReducer', () => {
  it('should set isLoggedIn to true on onLogin', () => {
    const newIsLoggedIn = true;
    const payload = {isLoggedIn: newIsLoggedIn};

    store.dispatch(onLogin(payload));

    const state = store.getState();
    expect(state.auth.isLoggedIn).toBe(newIsLoggedIn);
  });

  it('should set isLoggedIn to false on onLogout', () => {
    const initialIsLoggedIn = true;
    const payload = {isLoggedIn: false};

    store.dispatch(onLogin({isLoggedIn: initialIsLoggedIn}));
    store.dispatch(onLogout(payload));

    const state = store.getState();
    expect(state.auth.isLoggedIn).toBe(payload.isLoggedIn);
  });
});
