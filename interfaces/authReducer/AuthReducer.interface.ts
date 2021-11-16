export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  accessToken: string | null;
}

export interface AuthAction {
  type: string;
  accessToken?: string | null;
}
