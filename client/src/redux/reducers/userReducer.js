const storedUser = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: storedUser || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;