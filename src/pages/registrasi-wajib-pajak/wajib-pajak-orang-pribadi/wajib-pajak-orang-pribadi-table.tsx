import { columns } from '@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi/columns';

import { TWajibPajakOrangPribadiModel } from '@/types/wajib-pajak-orang-pribadi-type';

import { DataTable } from '@/components/ui/data-table';

type TWajibPajakOrangPribadiProps = {
  datas: TWajibPajakOrangPribadiModel[];
  pageCount: number;
  page: number;
  handleUpdate: (kode_wajib_pajak_orang_pribadi: string) => void;
  handleDelete: (kode_wajib_pajak_orang_pribadi: string) => void;
};

export default function WajibPajakOrangPribadiTable({
  datas,
  pageCount,
  page,
  handleUpdate,
  handleDelete,
}: TWajibPajakOrangPribadiProps) {
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
