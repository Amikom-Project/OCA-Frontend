import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'sonner';

import AppRouter from '@/routes';
import { AuthProvider } from '@/providers/auth-provider';

const queryClient = new QueryClient();

function AppProvider() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Suspense>
              <AppRouter />
            </Suspense>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
      <Toaster position='top-right' richColors expand={true} closeButton />
    </HelmetProvider>
  );
}

export default AppProvider;
