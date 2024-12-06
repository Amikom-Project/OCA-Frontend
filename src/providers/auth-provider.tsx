import { createContext, ReactNode, useCallback } from 'react';

import { useSessionStorage } from '@/hooks/use-session-storage';

import { TAuthModel } from '@/types/auth-type';

export interface AuthContextType {
  user: TAuthModel;
  login: (data: TAuthModel) => void;
  pilihSatuanKerja: (data: TAuthModel) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [nip, setNip] = useSessionStorage('nip', '');
  const [idl, setIdl] = useSessionStorage('idl', '');
  const [namaPegawai, setNamaPegawai] = useSessionStorage('nama_pegawai', '');
  const [namaSatker, setNamaSatker] = useSessionStorage('nama_satker', '');
  const [accessToken, setAccessToken] = useSessionStorage('access_token', '');

  const login = useCallback(
    (data: TAuthModel) => {
      setNip(data.nip);
      setIdl(Array.isArray(data.idl) ? data.idl.join(', ') : data.idl);
      setNamaPegawai(data.nama_pegawai);
      setNamaSatker(
        Array.isArray(data.nama_satker)
          ? data.nama_satker.join(', ')
          : data.nama_satker
      );

      setAccessToken(data.access_token);
    },
    [setNip, setIdl, setNamaPegawai, setNamaSatker, setAccessToken]
  );

  const pilihSatuanKerja = useCallback(
    (data: TAuthModel) => {
      setNip(data.nip);
      setIdl(data.idl);
      setNamaPegawai(data.nama_pegawai);
      setNamaSatker(data.nama_satker);

      setAccessToken(data.access_token);
    },
    [setNip, setIdl, setNamaPegawai, setNamaSatker, setAccessToken]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem('nip');
    sessionStorage.removeItem('nama_pegawai');
    sessionStorage.removeItem('idl');
    sessionStorage.removeItem('nama_satker');
    sessionStorage.removeItem('access_token');
  }, []);

  const user = {
    nip,
    idl,
    nama_pegawai: namaPegawai,
    nama_satker: namaSatker,
    access_token: accessToken,
  };

  const value = {
    user: user,
    login,
    pilihSatuanKerja,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
