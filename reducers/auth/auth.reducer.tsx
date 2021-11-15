import { AuthAction, AuthState } from '../../interfaces/authReducer/AuthReducer.interface';

const authInitialState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        userToken: action.token!,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token!,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    default:
      return { ...prevState };
  }
};

export { authReducer, authInitialState };
