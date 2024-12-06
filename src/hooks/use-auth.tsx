import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext, AuthContextType } from '@/providers/auth-provider';

import { toast } from 'sonner';

export const useAuth = (): AuthContextType & {
  navigateAfterLogin: () => void;
  navigateAfterLogout: () => void;
} => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const navigateAfterLogin = () => {
    toast.success('Selamat Datang di One Collecting Agent !');
    navigate('/dashboard');
  };

  const navigateAfterLogout = () => {
    toast.success('Anda Berhasil Logout !');
    navigate('/', { replace: true });
  };

  return {
    ...context,
    navigateAfterLogin,
    navigateAfterLogout,
  };
};
