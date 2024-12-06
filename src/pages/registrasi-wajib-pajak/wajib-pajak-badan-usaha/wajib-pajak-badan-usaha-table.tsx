import { columns } from '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/columns';

import { TWajibPajakBadanUsahaModel } from '@/types/wajib-pajak-badan-usaha-type';

import { DataTable } from '@/components/ui/data-table';

type TWajibPajakBadanUsahaProps = {
  datas: TWajibPajakBadanUsahaModel[];
  pageCount: number;
  page: number;
  handleUpdate: (kode_wajib_pajak_badan_usaha: string) => void;
  handleDelete: (kode_wajib_pajak_badan_usaha: string) => void;
};

export default function WajibPajakBadanUsahaTable({
  datas,
  pageCount,
  page,
  handleUpdate,
  handleDelete,
}: TWajibPajakBadanUsahaProps) {
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
