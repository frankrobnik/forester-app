import { AuthResponse } from '../interfaces/authResponse/AuthResponse.interface';

const forester = {
  baseUrl: 'https://forester-server.herokuapp.com',
  register: function (user: { username: string; password: string; email: string }) {
    const endpoint = this.baseUrl + '/auth/register';
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res): Promise<AuthResponse> => res.json());
  },
  login: function (login: { email: string; password: string }) {
    const endpoint = this.baseUrl + '/auth/login';
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    }).then((res): Promise<AuthResponse> => res.json());
  },
};

export default forester;
