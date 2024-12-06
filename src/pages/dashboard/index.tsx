import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

import { useGetCountPPh } from './queries';

import PageHead from '@/components/shared/page-head';
import { cardItems as originalCardItems } from '@/constants/card-items';
import { Icons } from '@/components/ui/icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  const { user } = useAuth();
  const token = user?.access_token;
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;

  const { data } = useGetCountPPh(idl, token);

  const currentYear = new Date().getFullYear();

  const cardItems = originalCardItems.map((card) => {
    switch (card.label) {
      case 'PPh 21 Entry':
        return { ...card, count: data?.result.pph_21_entry || 0 };
      case 'PPh 21 Verifikasi':
        return { ...card, count: data?.result.pph_21_verifikasi || 0 };
      case 'PPh 21 Setor':
        return { ...card, count: data?.result.pph_21_setor || 0 };
      case 'PPh 23 Entry':
        return { ...card, count: data?.result.pph_23_entry || 0 };
      case 'PPh 23 Verifikasi':
        return { ...card, count: data?.result.pph_23_verifikasi || 0 };
      case 'PPh 23 Setor':
        return { ...card, count: data?.result.pph_23_setor || 0 };
      case 'PPh 4 Ayat 2 Entry':
        return { ...card, count: data?.result.pph_4_ayat_2_entry || 0 };
      case 'PPh 4 Ayat 2 Verifikasi':
        return { ...card, count: data?.result.pph_4_ayat_2_verifikasi || 0 };
      case 'PPh 4 Ayat 2 Setor':
        return { ...card, count: data?.result.pph_4_ayat_2_setor || 0 };
      default:
        return card;
    }
  });

  return (
    <>
      <PageHead title='Dashboard' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='md:text-2xl text-xl font-semibold tracking-tight '>
            Informasi Total PPh Tahun {currentYear}
          </h2>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {cardItems.map((card) => {
            const IconComponent = card.icon ? Icons[card.icon] : null;

            return (
              <Link to={card.href} key={card.href}>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-base font-medium'>
                      {card.label}
                    </CardTitle>
                    {IconComponent && <IconComponent />}
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{card.count}</div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
