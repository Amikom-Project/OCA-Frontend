import { NavItemWithOptionalChildren } from '@/types/nav-items-type';

export const navItems: NavItemWithOptionalChildren[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: 'PPh 21',
    href: '/pph-21/data-pph-21-kegiatan',
    icon: 'userRound',
    label: 'PPh 21',
  },
  {
    title: 'PPh 23',
    href: '/pph-23/data-pph-23',
    icon: 'building',
    label: 'PPh 23',
  },
  {
    title: 'PPh 4 Ayat 2',
    href: '/pph-4-ayat-2/data-pph-4-ayat-2',
    icon: 'building',
    label: 'PPh 4 Ayat 2',
  },
  {
    title: 'Inventarisasi Pajak',
    href: '/inventarisasi-pajak/data-inventarisasi-pajak',
    icon: 'university',
    label: 'Inventarisasi Pajak',
  },
  {
    title: 'Registrasi Wajib Pajak',
    href: '/registrasi-wajib-pajak',
    icon: 'database',
    label: 'Registrasi Wajib Pajak',
    items: [
      {
        title: 'Wajib Pajak Orang Pribadi',
        href: '/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi',
        icon: 'user',
        label: 'Wajib Pajak Orang Pribadi',
      },
      {
        title: 'Wajib Pajak Badan Usaha',
        href: '/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha',
        icon: 'building',
        label: 'Wajib Pajak Badan Usaha',
      },
    ],
  },
];
