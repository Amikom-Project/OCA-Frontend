import FormTambahWajibPajakOrangPribadi from '@/components/form/register-wajib-pajak/wajib-pajak-orang-pribadi/form-tambah-wajib-pajak-orang-pribadi';
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

export default function FormTambahWajibPajakOrangPribadiPage() {
  return (
    <>
      <PageHead title='Form Tambah Wajib Pajak Orang Pribadi' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Tambah Wajib Pajak Orang Pribadi</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Registrasi Wajib Pajak</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi'>
                    Data Wajib Pajak Orang Pribadi
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Form Tambah Wajib Pajak Orang Pribadi
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            <FormTambahWajibPajakOrangPribadi />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
