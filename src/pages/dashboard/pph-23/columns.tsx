import { ColumnDef } from '@tanstack/react-table';

import formatDate from '@/utils/formatDate';
import formatCurrency from '@/utils/formatCurrency';

import { TPPh23Model } from '@/types/pph-23-type';

import ActionButtons from '@/pages/dashboard/pph-23/action-button';

export const columns = (
  handleUpdate: (kode_kegiatan_penghasilan_badan_usaha: string) => void
): ColumnDef<TPPh23Model>[] => [
  {
    id: 'no',
    header: () => <div className='text-left'>No</div>,
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'tanggal_input',
    header: () => <div className='text-left'>Tanggal Input</div>,
    cell: ({ cell }) => formatDate(cell.getValue<string>()),
  },
  {
    accessorKey: 'uraian_kegiatan',
    header: () => <div className='text-left'>Uraian Kegiatan</div>,
  },
  {
    accessorKey: 'no_pengajuan',
    header: () => <div className='text-left'>No Pengajuan</div>,
  },
  {
    accessorKey: 'nama_penerima',
    header: () => <div className='text-left'>Nama Penerima</div>,
  },
  {
    accessorKey: 'penghasilan_bruto',
    header: () => <div className='text-left'>Penghasilan Bruto</div>,
    cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
  },
  {
    accessorKey: 'aksi',
    header: () => <div className='text-left'>Aksi</div>,
    cell: ({ row }) => {
      const kodeKegiatanPenghasilanBadanUsaha =
        row.original.kode_kegiatan_penghasilan_badan_usaha;
      return (
        <ActionButtons
          kode_kegiatan_penghasilan_badan_usaha={
            kodeKegiatanPenghasilanBadanUsaha
          }
          onUpdate={handleUpdate}
        />
      );
    },
  },
];
