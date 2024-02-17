import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {onLogin} from '../redux/authReducer';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const callLoginApi = (email: string, password: string) => {
    console.log(email, password);
    dispatch(onLogin({isLoggedIn: true}));
  };

  const callLogoutApi = () => {
    dispatch(onLogin({isLoggedIn: false}));
  };

  return {callLoginApi, callLogoutApi};
};
