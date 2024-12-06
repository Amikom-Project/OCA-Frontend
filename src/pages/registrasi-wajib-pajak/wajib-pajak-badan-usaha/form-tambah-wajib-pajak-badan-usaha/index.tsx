import PageHead from '@/components/shared/page-head';

import FormTambahWajibPajakBadanUsaha from '@/components/form/register-wajib-pajak/wajib-pajak-badan-usaha/form-tambah-wajib-pajak-badan-usaha';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function FormTambahWajibPajakBadanUsahaPage() {
  return (
    <>
      <PageHead title='Form Tambah Wajib Pajak Badan Usaha' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Tambah Wajib Pajak Badan Usaha</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Registrasi Wajib Pajak</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha'>
                    Data Wajib Pajak Badan Usaha
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Form Tambah Wajib Pajak Badan Usaha
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            <FormTambahWajibPajakBadanUsaha />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
