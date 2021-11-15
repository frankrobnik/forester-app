export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

export interface AuthAction {
  type: string;
  token?: string | null;
}
