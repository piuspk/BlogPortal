// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load the user from local storage
const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Initial state
const initialState = {
  user: loadUserFromLocalStorage(),
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(user));
      // Update the state
      state.user = user;
    },
  },
});

// Export the action
export const { setUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
