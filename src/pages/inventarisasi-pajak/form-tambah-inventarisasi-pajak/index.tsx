import PageHead from '@/components/shared/page-head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import FormTambahInventarisasiPajak from '@/components/form/inventarisasi-pajak/form-tambah-inventarisasi-pajak';

export default function FormTambahInventarisasiPajakPage() {
  return (
    <>
      <PageHead title='Form Tambah Inventarisasi Pajak' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Tambah Inventarisasi Pajak</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Inventarisasi Pajak</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/inventarisasi-pajak/data-inventarisasi-pajak'>
                    Data Inventarisasi Pajak
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Form Tambah Inventarisasi Pajak
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            <FormTambahInventarisasiPajak />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
