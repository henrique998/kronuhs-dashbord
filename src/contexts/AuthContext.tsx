/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

interface AuthProviderProps {
   children: ReactNode
}

interface SignInData {
    email: string;
    password: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    roles: {
        name: string;
    }[];
}

interface SignInResponse {
    token: string;
    userData: User;
    refresh_token: string;
}

interface AuthContextData {
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => void;
    user: User | undefined;
    isUserLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function signOut(): void {
    destroyCookie(undefined, '@kronuhs-dashboard:token')
    destroyCookie(undefined, '@kronuhs-dashboard:refresh_token')

    Router.push('/');
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>();
    const isUserLoggedIn = !!user;    

    useEffect(() => {
        const { '@kronuhs-dashboard:token': token } = parseCookies()
        
        if (token) {
          api
            .get('/dashboard/users/profile')
            .then(response => setUser(response.data))
            .catch(() => {
              signOut()
            })
        }
    }, []);

    const signIn = useCallback(async ({ email, password }: SignInData): Promise<void> => {
        try {
            const {
                data: {
                    token,
                    refresh_token,
                    userData
                }
            } = await api.post<SignInResponse>('/dashboard/session', {
              email,
              password
            });

            setCookie(undefined, '@kronuhs-dashboard:token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });

            setCookie(undefined, '@kronuhs-dashboard:refresh_token', refresh_token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });

            setUser({
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email,
                avatarUrl: userData.avatarUrl,
                roles: userData.roles
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            Router.push('/home');
            
        } catch (err: any) {
            toast.error(err.response.data.message, {
                position: 'top-center'
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            user,
            signOut,
            isUserLoggedIn,
        }}>
            {children}
        </AuthContext.Provider>
    );
}