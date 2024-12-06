import { columns } from '@/pages/dashboard/pph-23/columns';

import { TPPh23Model } from '@/types/pph-23-type';

import { DataTable } from '@/components/ui/data-table';

type TPPh23Props = {
  datas: TPPh23Model[];
  pageCount: number;
  page: number;
  handleUpdate: (kode_kegiatan_penghasilan_badan_usaha: string) => void;
};

export default function PPh23Table({
  datas,
  pageCount,
  page,
  handleUpdate,
}: TPPh23Props) {
  return (
    <>
      <DataTable
        columns={columns(handleUpdate)}
        data={datas}
        pageCount={pageCount}
        page={page}
      />
    </>
  );
}
