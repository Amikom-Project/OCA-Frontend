import { columns } from '@/pages/pph-4-ayat-2/columns';

import { TPPh4Ayat2Model } from '@/types/pph-4-ayat-2-type';

import { DataTable } from '@/components/ui/data-table';

type TPPh4Ayat2Props = {
  datas: TPPh4Ayat2Model[];
  pageCount: number;
  page: number;
  handleUpdate: (kode_kegiatan_penghasilan_badan_usaha: string) => void;
  handleDelete: (kode_kegiatan_penghasilan_badan_usaha: string) => void;
};

export default function PPh4Ayat2Table({
  datas,
  pageCount,
  page,
  handleUpdate,
  handleDelete,
}: TPPh4Ayat2Props) {
  return (
    <>
      <DataTable
        columns={columns(handleUpdate, handleDelete)}
        data={datas}
        pageCount={pageCount}
        page={page}
      />
    </>
  );
}
