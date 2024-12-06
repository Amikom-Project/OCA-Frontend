import PageHead from '@/components/shared/page-head';

import FormTambahPPh4Ayat2 from '@/components/form/pph-4-ayat-2/form-tambah-pph-4-ayat-2';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function FormTambahPPh4Ayat2Page() {
  return (
    <>
      <PageHead title='Form Tambah PPh 4 Ayat 2' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Tambah PPh 4 Ayat 2</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>PPh 4 Ayat 2</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/pph-4-ayat-2/data-pph-4-ayat-2'>
                    Data PPh 4 Ayat 2
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Form Tambah PPh 4 Ayat 2</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            <FormTambahPPh4Ayat2 />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
