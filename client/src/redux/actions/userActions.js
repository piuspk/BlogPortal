export const setUser = (user) => {
  // Save user data to local storage
  localStorage.setItem('user', JSON.stringify(user));
  
  return {
    type: 'SET_USER',
    payload: user
  };
};