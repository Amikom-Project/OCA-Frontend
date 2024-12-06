import { columns } from '@/pages/inventarisasi-pajak/columns';

import { TInventarisasiPajakModel } from '@/types/inventarisasi-pajak-type';

import { DataTable } from '@/components/ui/data-table';

type TInventarisasiPajakProps = {
  datas: TInventarisasiPajakModel[];
  pageCount: number;
  page: number;
  handleUpdate: (kode_inventarisasi_pajak: string) => void;
  handleDelete: (kode_inventarisasi_pajak: string) => void;
};

export default function InventarisasiPajakTable({
  datas,
  pageCount,
  page,
  handleUpdate,
  handleDelete,
}: TInventarisasiPajakProps) {
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
