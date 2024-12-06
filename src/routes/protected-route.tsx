import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.access_token) {
    return <Navigate to='/' />;
  }

  try {
    const decodedToken: { exp?: number } = jwtDecode(user.access_token);

    if (decodedToken?.exp) {
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        sessionStorage.removeItem('nip');
        sessionStorage.removeItem('nama_pegawai');
        sessionStorage.removeItem('idl');
        sessionStorage.removeItem('nama_satker');
        sessionStorage.removeItem('access_token');

        return <Navigate to='/' />;
      }
    } else {
      sessionStorage.removeItem('nip');
      sessionStorage.removeItem('nama_pegawai');
      sessionStorage.removeItem('idl');
      sessionStorage.removeItem('nama_satker');
      sessionStorage.removeItem('access_token');

      console.error("Token does not have 'exp' field.");
      return <Navigate to='/' />;
    }
  } catch (error) {
    sessionStorage.removeItem('nip');
    sessionStorage.removeItem('nama_pegawai');
    sessionStorage.removeItem('idl');
    sessionStorage.removeItem('nama_satker');
    sessionStorage.removeItem('access_token');

    console.error('Error decoding token:', error);
    return <Navigate to='/' />;
  }

  return children;
};
