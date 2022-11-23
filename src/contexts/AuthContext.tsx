import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebNrowser from 'expo-web-browser';
import { api } from '../services/api';

WebNrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}
export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthProviderProps){
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUsersLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '139940565708-uv8m5tonn02f1qcnltd738266ndt5t9o.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  });

  async function signIn(){
    try {
      setIsUsersLoading(true);
      await promptAsync();
    } catch(error){
      console.log(error);
      throw error;
    } finally {
      setIsUsersLoading(false);
    }
   }

   async function signInWithGoogle(access_token: string) {
    try {
      setIsUsersLoading(true);

      const tokenResponse = await api.post('/users', {access_token});
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);

    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        setIsUsersLoading(false);
    }
   }

   useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
   },[response]);

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}