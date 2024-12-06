import { ColumnDef } from '@tanstack/react-table';

import formatDate from '@/utils/formatDate';

import { TInventarisasiPajakModel } from '@/types/inventarisasi-pajak-type';

import ActionButtons from '@/pages/inventarisasi-pajak/action-button';

export const columns = (
  handleUpdate: (kode_inventarisasi_pajak: string) => void,
  handleDelete: (kode_inventarisasi_pajak: string) => void
): ColumnDef<TInventarisasiPajakModel>[] => [
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
    cell: ({ getValue }) => {
      const noPengajuan = getValue();
      return noPengajuan ? noPengajuan : 'No Pengajuan tidak tersedia';
    },
  },
  {
    accessorKey: 'jenis_pajak',
    header: () => <div className='text-left'>Jenis Pajak</div>,
  },
  {
    accessorKey: 'aksi',
    header: () => <div className='text-left'>Aksi</div>,
    cell: ({ row }) => {
      const kodeInventarisasiPajak = row.original.kode_inventarisasi_pajak;
      return (
        <ActionButtons
          kode_inventarisasi_pajak={kodeInventarisasiPajak}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      );
    },
  },
];
