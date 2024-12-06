import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { ProtectedRoute } from '@/routes/protected-route';

// Base Layout
const DashboardLayout = lazy(() => import('@/layouts/dashboard-layout'));

// Public Route
const LoginPage = lazy(() => import('@/pages/auth/login'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

// Private Route
const PilihSatuanKerjaPage = lazy(
  () => import('@/pages/auth/pilih-satuan-kerja')
);

// Dashboard Menu
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const PPh21EntryPage = lazy(
  () => import('@/pages/dashboard/pph-21/pph-21-entry')
);
const PPh21VerifikasiPage = lazy(
  () => import('@/pages/dashboard/pph-21/pph-21-verifikasi')
);
const PPh21SetorPage = lazy(
  () => import('@/pages/dashboard/pph-21/pph-21-setor')
);
const PPh23EntryPage = lazy(
  () => import('@/pages/dashboard/pph-23/pph-23-entry')
);
const PPh23VerifikasiPage = lazy(
  () => import('@/pages/dashboard/pph-23/pph-23-verifikasi')
);
const PPh23SetorPage = lazy(
  () => import('@/pages/dashboard/pph-23/pph-23-setor')
);
const PPh4Ayat2EntryPage = lazy(
  () => import('@/pages/dashboard/pph-4-ayat-2/pph-4-ayat-2-entry')
);
const PPh4Ayat2VerifikasiPage = lazy(
  () => import('@/pages/dashboard/pph-4-ayat-2/pph-4-ayat-2-verifikasi')
);
const PPh4Ayat2SetorPage = lazy(
  () => import('@/pages/dashboard/pph-4-ayat-2/pph-4-ayat-2-setor')
);

// PPh 21 Menu
const PPh21KegiatanPage = lazy(() => import('@/pages/pph-21/pph-21-kegiatan'));
const FormTambahPPh21KegiatanPage = lazy(
  () => import('@/pages/pph-21/pph-21-kegiatan/form-tambah-pph-21-kegiatan')
);
const FormEditPPh21KegiatanPage = lazy(
  () => import('@/pages/pph-21/pph-21-kegiatan/form-edit-pph-21-kegiatan')
);
const PPh21PenerimaPage = lazy(() => import('@/pages/pph-21/pph-21-penerima'));
const FormTambahPPh21PenerimaPage = lazy(
  () => import('@/pages/pph-21/pph-21-penerima/form-tambah-pph-21-penerima')
);
const FormEditPPh21PenerimaPage = lazy(
  () => import('@/pages/pph-21/pph-21-penerima/form-edit-pph-21-penerima')
);

// PPh 23 Menu
const PPh23Page = lazy(() => import('@/pages/pph-23'));
const FormTambahPPh23Page = lazy(
  () => import('@/pages/pph-23/form-tambah-pph-23')
);
const FormEditPPh23Page = lazy(() => import('@/pages/pph-23/form-edit-pph-23'));

// PPh 4 Ayat 2 Menu
const PPh4Ayat2Page = lazy(() => import('@/pages/pph-4-ayat-2'));
const FormTambahPPh4Ayat2Page = lazy(
  () => import('@/pages/pph-4-ayat-2/form-tambah-pph-4-ayat-2')
);
const FormEditPPh4Ayat2Page = lazy(
  () => import('@/pages/pph-4-ayat-2/form-edit-pph-4-ayat-2')
);

// Inventarisasi Pajak Menu
const InventarisasiPajakPage = lazy(
  () => import('@/pages/inventarisasi-pajak')
);
const FormTambahInventarisasiPajakPage = lazy(
  () => import('@/pages/inventarisasi-pajak/form-tambah-inventarisasi-pajak')
);
const FormEditInventarisasiPajakPage = lazy(
  () => import('@/pages/inventarisasi-pajak/form-edit-inventarisasi-pajak')
);

// Registrasi Wajib Pajak Menu
const WajibPajakOrangPribadiPage = lazy(
  () => import('@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi')
);
const FormTambahWajibPajakOrangPribadiPage = lazy(
  () =>
    import(
      '@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi/form-tambah-wajib-pajak-orang-pribadi'
    )
);
const FormEditWajibPajakOrangPribadiPage = lazy(
  () =>
    import(
      '@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi/form-edit-wajib-pajak-orang-pribadi'
    )
);

const WajibPajakBadanUsahaPage = lazy(
  () => import('@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha')
);
const FormTambahWajibPajakBadanUsahaPage = lazy(
  () =>
    import(
      '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/form-tambah-wajib-pajak-badan-usaha'
    )
);
const FormEditWajibPajakBadanUsahaPage = lazy(
  () =>
    import(
      '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/form-edit-wajib-pajak-badan-usaha'
    )
);

export default function AppRouter() {
  const publicRoutes = [
    {
      path: '/',
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
      index: true,
    },
    {
      path: '/404',
      element: <NotFoundPage />,
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    },
  ];

  const protectedRoutes = [
    {
      path: '/pilih-satuan-kerja',
      element: (
        <ProtectedRoute>
          <Suspense>
            <PilihSatuanKerjaPage />
          </Suspense>
        </ProtectedRoute>
      ),
      index: true,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Suspense>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </Suspense>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
        {
          path: '/dashboard/pph-21-entry',
          element: <PPh21EntryPage />,
        },
        {
          path: '/dashboard/pph-21-verifikasi',
          element: <PPh21VerifikasiPage />,
        },
        {
          path: '/dashboard/pph-21-setor',
          element: <PPh21SetorPage />,
        },
        {
          path: '/dashboard/pph-23-entry',
          element: <PPh23EntryPage />,
        },
        {
          path: '/dashboard/pph-23-verifikasi',
          element: <PPh23VerifikasiPage />,
        },
        {
          path: '/dashboard/pph-23-setor',
          element: <PPh23SetorPage />,
        },
        {
          path: '/dashboard/pph-4-ayat-2-entry',
          element: <PPh4Ayat2EntryPage />,
        },
        {
          path: '/dashboard/pph-4-ayat-2-verifikasi',
          element: <PPh4Ayat2VerifikasiPage />,
        },
        {
          path: '/dashboard/pph-4-ayat-2-setor',
          element: <PPh4Ayat2SetorPage />,
        },
        {
          path: '/pph-21/data-pph-21-kegiatan',
          element: <PPh21KegiatanPage />,
        },
        {
          path: '/pph-21/data-pph-21-kegiatan/form-tambah-pph-21-kegiatan',
          element: <FormTambahPPh21KegiatanPage />,
        },
        {
          path: '/pph-21/data-pph-21-kegiatan/form-edit-pph-21-kegiatan',
          element: <FormEditPPh21KegiatanPage />,
        },
        {
          path: '/pph-21/data-pph-21-kegiatan/data-pph-21-penerima',
          element: <PPh21PenerimaPage />,
        },
        {
          path: '/pph-21/data-pph-21-kegiatan/data-pph-21-penerima/form-tambah-pph-21-penerima',
          element: <FormTambahPPh21PenerimaPage />,
        },
        {
          path: '/pph-21/data-pph-21-kegiatan/data-pph-21-penerima/form-edit-pph-21-penerima',
          element: <FormEditPPh21PenerimaPage />,
        },
        {
          path: '/pph-23/data-pph-23',
          element: <PPh23Page />,
        },
        {
          path: '/pph-23/data-pph-23/form-tambah-pph-23',
          element: <FormTambahPPh23Page />,
        },
        {
          path: '/pph-23/data-pph-23/form-edit-pph-23',
          element: <FormEditPPh23Page />,
        },
        {
          path: '/pph-4-ayat-2/data-pph-4-ayat-2',
          element: <PPh4Ayat2Page />,
        },
        {
          path: '/pph-4-ayat-2/data-pph-4-ayat-2/form-tambah-pph-4-ayat-2',
          element: <FormTambahPPh4Ayat2Page />,
        },
        {
          path: '/pph-4-ayat-2/data-pph-4-ayat-2/form-edit-pph-4-ayat-2',
          element: <FormEditPPh4Ayat2Page />,
        },
        {
          path: '/inventarisasi-pajak/data-inventarisasi-pajak',
          element: <InventarisasiPajakPage />,
        },
        {
          path: '/inventarisasi-pajak/data-inventarisasi-pajak/form-tambah-inventarisasi-pajak',
          element: <FormTambahInventarisasiPajakPage />,
        },
        {
          path: '/inventarisasi-pajak/data-inventarisasi-pajak/form-edit-inventarisasi-pajak',
          element: <FormEditInventarisasiPajakPage />,
        },
        {
          path: '/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi',
          element: <WajibPajakOrangPribadiPage />,
        },
        {
          path: '/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi/form-tambah-wajib-pajak-orang-pribadi',
          element: <FormTambahWajibPajakOrangPribadiPage />,
        },
        {
          path: '/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi/form-edit-wajib-pajak-orang-pribadi',
          element: <FormEditWajibPajakOrangPribadiPage />,
        },
        {
          path: '/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha',
          element: <WajibPajakBadanUsahaPage />,
        },
        {
          path: '/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha/form-tambah-wajib-pajak-badan-usaha',
          element: <FormTambahWajibPajakBadanUsahaPage />,
        },
        {
          path: '/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha/form-edit-wajib-pajak-badan-usaha',
          element: <FormEditWajibPajakBadanUsahaPage />,
        },
      ],
    },
  ];

  const routes = useRoutes([...publicRoutes, ...protectedRoutes]);

  return routes;
}
