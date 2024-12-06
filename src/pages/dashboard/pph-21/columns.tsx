import { ColumnDef } from '@tanstack/react-table';

import { TPPh21PenerimaModel } from '@/types/pph-21-penerima-type';

import formatDate from '@/utils/formatDate';
import formatCurrency from '@/utils/formatCurrency';

import ActionButtons from '@/pages/dashboard/pph-21/action-button';

export const columns: ColumnDef<TPPh21PenerimaModel>[] = [
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
    accessorKey: 'kode_wajib_pajak_orang_pribadi',
    header: () => <div className='text-left'>Nama Penerima</div>,
  },
  {
    accessorKey: 'status_pegawai',
    header: () => <div className='text-left'>Status Pegawai</div>,
  },
  {
    accessorKey: 'penghasilan_bruto',
    header: () => <div className='text-left'>Penghasilan Bruto</div>,
    cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
  },
  {
    accessorKey: 'tarif_berlaku',
    header: () => <div className='text-left'>Tarif Pajak</div>,
  },
  {
    accessorKey: 'potongan_pajak',
    header: () => <div className='text-left'>Potongan Pajak</div>,
    cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
  },
  {
    accessorKey: 'penghasilan_diterima',
    header: () => <div className='text-left'>Penghasilan Diterima</div>,
    cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
  },
  {
    accessorKey: 'aksi',
    header: () => <div className='text-left'>Aksi</div>,
    cell: () => <ActionButtons />,
  },
];
