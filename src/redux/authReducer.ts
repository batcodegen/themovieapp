import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SliceState = {
  isLoggedIn: boolean;
};

const initialState: SliceState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin(state, action: PayloadAction<SliceState>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    onLogout(state, action: PayloadAction<SliceState>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const {onLogin, onLogout} = authSlice.actions;
export default authSlice.reducer;
