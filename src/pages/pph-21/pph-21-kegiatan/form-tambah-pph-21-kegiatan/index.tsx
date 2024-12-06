import FormTambahPPh21Kegiatan from '@/components/form/pph-21/pph-21-kegiatan/form-tambah-pph-21-kegiatan';
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

export default function FormTambahPPh21KegiatanPage() {
  return (
    <>
      <PageHead title='Form Tambah PPh 21 Kegiatan' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Tambah PPh 21 Kegiatan</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>PPh 21</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/pph-21/data-pph-21-kegiatan'>
                    Data PPh 21 Kegiatan
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Form Tambah PPh 21 Kegiatan</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            <FormTambahPPh21Kegiatan />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
