import { columns } from '@/pages/pph-21/pph-21-penerima/columns';

import { TPPh21PenerimaModel } from '@/types/pph-21-penerima-type';

import { DataTable } from '@/components/ui/data-table';

type TPPh21PenerimaProps = {
  datas: TPPh21PenerimaModel[];
  pageCount: number;
  page: number;
  // handleUpdate: (kode_kegiatan_penghasilan_orang_pribadi: string) => void;
  handleDelete: (kode_kegiatan_penghasilan_orang_pribadi: string) => void;
};

export default function PPh21PenerimaTable({
  datas,
  pageCount,
  page,
  // handleUpdate,
  handleDelete,
}: TPPh21PenerimaProps) {
  return (
    <>
      <DataTable
        columns={columns(handleDelete)}
        data={datas}
        pageCount={pageCount}
        page={page}
      />
    </>
  );
}
