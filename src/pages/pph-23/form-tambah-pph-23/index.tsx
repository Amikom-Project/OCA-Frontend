import PageHead from '@/components/shared/page-head';

import FormTambahPPh23 from '@/components/form/pph-23/form-tambah-pph-23';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function FormTambahPPh23Page() {
  return (
    <>
      <PageHead title='Form Tambah PPh 23' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Tambah PPh 23</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>PPh 23</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/pph-23/data-pph-23'>
                    Data PPh 23
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Form Tambah PPh 23</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            <FormTambahPPh23 />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
