import { columns } from '@/pages/pph-21/pph-21-kegiatan/columns';

import { TPPh21KegiatanModel } from '@/types/pph-21-kegiatan-type';

import { DataTable } from '@/components/ui/data-table';

type TPPh21KegiatanProps = {
  datas: TPPh21KegiatanModel[];
  pageCount: number;
  page: number;
  handleMove: (kode_kegiatan_penghasilan_orang_pribadi: string) => void;
  handleUpdate: (kode_kegiatan_penghasilan_orang_pribadi: string) => void;
  handleDelete: (kode_kegiatan_penghasilan_orang_pribadi: string) => void;
};

export default function PPh21KegiatanTable({
  datas,
  pageCount,
  page,
  handleMove,
  handleUpdate,
  handleDelete,
}: TPPh21KegiatanProps) {
  return (
    <>
      <DataTable
        columns={columns(handleMove, handleUpdate, handleDelete)}
        data={datas}
        pageCount={pageCount}
        page={page}
      />
    </>
  );
}
