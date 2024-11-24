import { createSlice } from "@reduxjs/toolkit";

// userSlice to save user details to log in

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    isLoggedIn: false,
  },
  reducers: {
    register: (state, action) => {
      state.userDetails = action.payload;
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      if (
        state.userDetails &&
        state.userDetails.username === username &&
        state.userDetails.password === password
      ) {
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
