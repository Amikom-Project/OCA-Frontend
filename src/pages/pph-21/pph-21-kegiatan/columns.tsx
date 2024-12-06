import { ColumnDef } from '@tanstack/react-table';

import formatDate from '@/utils/formatDate';
import formatCurrency from '@/utils/formatCurrency';

import { TPPh21KegiatanModel } from '@/types/pph-21-kegiatan-type';

import ActionButtons from '@/pages/pph-21/pph-21-kegiatan/action-button';

export const columns = (
  handleMove: (kode_kegiatan_penghasilan_orang_pribadi: string) => void,
  handleUpdate: (kode_kegiatan_penghasilan_orang_pribadi: string) => void,
  handleDelete: (kode_kegiatan_penghasilan_orang_pribadi: string) => void
): ColumnDef<TPPh21KegiatanModel>[] => [
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
    accessorKey: 'total_potongan_pajak',
    header: () => <div className='text-left'>Total Pajak</div>,
    cell: ({ cell }) => {
      const value = cell.getValue<number | null>();
      const displayValue = value === null ? 0 : value;
      return formatCurrency(displayValue);
    },
  },
  {
    accessorKey: 'total_penghasilan_bruto',
    header: () => <div className='text-left'>Total Penghasilan Bruto</div>,
    cell: ({ cell }) => {
      const value = cell.getValue<number | null>();
      const displayValue = value === null ? 0 : value;
      return formatCurrency(displayValue);
    },
  },
  {
    accessorKey: 'aksi',
    header: () => <div className='text-left'>Aksi</div>,
    cell: ({ row }) => {
      const kodeKegiatanPenghasilanOrangPribadi =
        row.original.kode_kegiatan_penghasilan_orang_pribadi;
      return (
        <ActionButtons
          kode_kegiatan_penghasilan_orang_pribadi={
            kodeKegiatanPenghasilanOrangPribadi
          }
          onMove={handleMove}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      );
    },
  },
];
