import { AuthAction, AuthState } from '../../interfaces/authReducer/AuthReducer.interface';

const authInitialState: AuthState = {
  isLoading: true,
  isSignout: false,
  accessToken: null,
};

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        accessToken: action.accessToken!,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        accessToken: action.accessToken!,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        accessToken: null,
      };
    default:
      return { ...prevState };
  }
};

export { authReducer, authInitialState };
