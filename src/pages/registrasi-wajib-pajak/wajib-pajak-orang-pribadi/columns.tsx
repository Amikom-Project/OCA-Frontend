import { ColumnDef } from '@tanstack/react-table';

import { TWajibPajakOrangPribadiModel } from '@/types/wajib-pajak-orang-pribadi-type';

import ActionButtons from '@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi/action-button';

export const columns = (
  handleUpdate: (kode_wajib_pajak_orang_pribadi: string) => void,
  handleDelete: (kode_wajib_pajak_orang_pribadi: string) => void
): ColumnDef<TWajibPajakOrangPribadiModel>[] => [
  {
    id: 'no',
    header: () => <div className='text-left'>No</div>,
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'nama',
    header: () => <div className='text-left'>Nama Lengkap</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className='text-left'>Email</div>,
  },
  {
    accessorKey: 'kewarganegaraan',
    header: () => <div className='text-left'>Warga Kenegaraan</div>,
  },
  {
    accessorKey: 'status_pegawai',
    header: () => <div className='text-left'>Status Pegawai</div>,
  },
  {
    accessorKey: 'aksi',
    header: () => <div className='text-left'>Aksi</div>,
    cell: ({ row }) => {
      const kodeWajibPajakOrangPribadi =
        row.original.kode_wajib_pajak_orang_pribadi;
      return (
        <ActionButtons
          kode_wajib_pajak_orang_pribadi={kodeWajibPajakOrangPribadi}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      );
    },
  },
];
