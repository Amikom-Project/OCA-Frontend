import { ColumnDef } from '@tanstack/react-table';

import { TWajibPajakBadanUsahaModel } from '@/types/wajib-pajak-badan-usaha-type';

import ActionButtons from '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/action-button';

export const columns = (
  handleUpdate: (kode_wajib_pajak_badan_usaha: string) => void,
  handleDelete: (kode_wajib_pajak_badan_usaha: string) => void
): ColumnDef<TWajibPajakBadanUsahaModel>[] => [
  {
    id: 'no',
    header: () => <div className='text-left'>No</div>,
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'nama_badan_usaha',
    header: () => <div className='text-left'>Nama Badan Usaha</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className='text-left'>Email</div>,
  },
  {
    accessorKey: 'nama_bank',
    header: () => <div className='text-left'>Nama Bank</div>,
  },
  {
    accessorKey: 'ada_skb_pph23',
    header: () => <div className='text-left'>SKB PPH 23</div>,
  },
  {
    accessorKey: 'status_pkp',
    header: () => <div className='text-left'>Status PKP</div>,
  },
  {
    accessorKey: 'aksi',
    header: () => <div className='text-left'>Aksi</div>,
    cell: ({ row }) => {
      const kodeWajibPajakBadanUsaha =
        row.original.kode_wajib_pajak_badan_usaha;
      return (
        <ActionButtons
          kode_wajib_pajak_badan_usaha={kodeWajibPajakBadanUsaha}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      );
    },
  },
];
