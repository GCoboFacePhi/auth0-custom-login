/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import auth0 from 'auth0-js';
import axios from 'axios';

type Props = { children: React.ReactNode };

const DATABASE_CONNECTION = 'Username-Password-Authentication';

type ContextProps = {
  login(email: string, password: string): Promise<unknown>;
  changePassword(email: string): Promise<unknown>;
  signup(email: string, password: string): Promise<unknown>;
  resetPassword(password: string): Promise<unknown>;
};

const AuthContext = createContext<ContextProps>({
  login: () => new Promise((resolve) => resolve({})),
  signup: () => new Promise((resolve) => resolve({})),
  changePassword: () => new Promise((resolve) => resolve({})),
  resetPassword: () => new Promise((resolve) => resolve({})),
});

const configAuth0 = (window as any).configAuth0;

export function AuthProvider({ children }: Props) {
  const webAuth = useMemo(
    () =>
      new auth0.WebAuth({
        domain: 'dev-kva89132.us.auth0.com',
        clientID: 'DW71z7A3n05pFpkiEAvvyrIdrb1XXXtV',
        responseType: 'code',
      }),
    []
  );

  const signup = useCallback(
    (email: string, password: string) => {
      return new Promise((resolve, reject) => {
        webAuth.signup(
          {
            email,
            password,
            connection: DATABASE_CONNECTION,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        );
      });
    },
    [webAuth]
  );

  const login = useCallback(
    (username: string, password: string) => {
      const urlParams = new URLSearchParams(window.location.search);
      const stateParam = urlParams.get('state') || '';
      return new Promise((resolve, reject) => {
        webAuth.login(
          {
            username,
            password,
            realm: DATABASE_CONNECTION,
            state: stateParam,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        );
      });
    },
    [webAuth]
  );

  const changePassword = useCallback(
    (email: string) => {
      return new Promise((resolve, reject) => {
        webAuth.changePassword(
          {
            email,
            connection: DATABASE_CONNECTION,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        );
      });
    },
    [webAuth]
  );

  const resetPassword = (password: string) => {
    const params = new URLSearchParams();
    params.append('_csrf', configAuth0.csrf_token);
    params.append('ticket', configAuth0.ticket);
    params.append('newPassword', password);
    params.append('confirmNewPassword', password);

    return axios.post('/lo/reset', params);
  };

  return (
    <AuthContext.Provider
      value={{ login, changePassword, signup, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
