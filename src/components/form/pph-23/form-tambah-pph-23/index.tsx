import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isAfter } from 'date-fns';
import { id } from 'date-fns/locale';

import { useAuth } from '@/hooks/use-auth';
import { useFetchOptionsWajibPajakOrangPribadi } from '@/hooks/use-option-wajib-pajak-orang-pribadi';
import { useFetchOptionsWajibPajakBadanUsaha } from '@/hooks/use-option-wajib-pajak-badan-usaha';
import { useFetchOptionsJenisPenghasilanPPh23 } from '@/hooks/use-option-jenis-penghasilan';
import { useFetchOptionsPengajuanAnggaran } from '@/hooks/use-option-pengajuan-anggaran';
import { useFetchOptionsObjekPajakPPh23 } from '@/hooks/use-option-objek-pajak';

import useCurrencyInput from '@/hooks/use-currency-input';
import { TPPh23FormSchema } from '@/types/pph-23-type';
import { PPh23Validation } from '@/validations/pph-23-schema-validation';
import { getFieldsMetaDataPPh23 } from '@/pages/pph-23/form-fields';

import { Create } from '@/api/pph-23-api';

import formatCurrency from '@/utils/formatCurrency';

import { SelectBox } from '@/components/ui/selectbox';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { useFileUpload } from '@/hooks/use-file-upload';

export default function FormTambahPPh23() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const invoiceUpload = useFileUpload();
  // const fakturPajakUpload = useFileUpload();
  // const dokumenKerjasamaUpload = useFileUpload();

  const token = user.access_token;
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;
  const nama_satker = Array.isArray(user.nama_satker)
    ? user.nama_satker.join(', ')
    : user.nama_satker;

  const { value, onChange } = useCurrencyInput(0);

  const { optionsWajibPajakOrangPribadi } =
    useFetchOptionsWajibPajakOrangPribadi(token);
  const { optionsWajibPajakBadanUsaha } =
    useFetchOptionsWajibPajakBadanUsaha(token);
  const { optionsJenisPenghasilan } =
    useFetchOptionsJenisPenghasilanPPh23(token);
  const { optionsPengajuanAnggaran } = useFetchOptionsPengajuanAnggaran(
    idl,
    token
  );
  const { optionsObjekPajakPPh23 } = useFetchOptionsObjekPajakPPh23(token);

  const form = useForm<TPPh23FormSchema>({
    resolver: zodResolver(PPh23Validation),
    defaultValues: {
      uraian_kegiatan: '',
      nama_penerima: '',
      npwp: '',
      nama_bank: '',
      no_rekening: '',
      nama_rekening: '',
      kode_objek_pajak: '',
      penghasilan_bruto: 0,
      tarif_pajak: 0,
      potongan_pajak: 0,
      penghasilan_diterima: 0,
    },
  });

  const optionsNamaPenerima = () => {
    const targetPenerima = form.watch('target_penerima');
    if (targetPenerima === 'Wajib Pajak Orang Pribadi') {
      return Array.isArray(optionsWajibPajakOrangPribadi)
        ? optionsWajibPajakOrangPribadi
        : [];
    }
    if (targetPenerima === 'Wajib Pajak Badan Usaha') {
      return Array.isArray(optionsWajibPajakBadanUsaha)
        ? optionsWajibPajakBadanUsaha
        : [];
    }
    return [];
  };

  const penghasilanBruto = form.watch('penghasilan_bruto');
  const tarifPajak = form.watch('tarif_pajak');

  useEffect(() => {
    const potonganPajak = (tarifPajak / 100) * (penghasilanBruto || 0);
    const penghasilanDiterima = (penghasilanBruto || 0) - potonganPajak;

    form.setValue('potongan_pajak', Number(potonganPajak.toFixed(2)));
    form.setValue(
      'penghasilan_diterima',
      Number(penghasilanDiterima.toFixed(2))
    );
  }, [penghasilanBruto, tarifPajak, form]);

  const onSubmit = async (data: TPPh23FormSchema) => {
    const formData = {
      ...data,
      // invoice: invoiceUpload.base64File || '',
      // faktur_pajak: fakturPajakUpload.base64File || '',
      // dokumen_kerjasama_kegiatan: dokumenKerjasamaUpload.base64File || '',
      idl,
    };

    const response = await Create(formData, token);

    if (response.status.code === 201) {
      toast.success(response.status.description);
      navigate('/pph-23/data-pph-23');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.jenis_penghasilan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.jenis_penghasilan.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsJenisPenghasilan}
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder='Pilih Jenis Penghasilan'
                    inputPlaceholder='Cari Jenis Penghasilan'
                    emptyPlaceholder='Jenis Penghasilan tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.uraian_kegiatan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.uraian_kegiatan.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.no_pengajuan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.no_pengajuan.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsPengajuanAnggaran}
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder='Pilih Pengajuan Anggaran'
                    inputPlaceholder='Cari Pengajuan Anggaran'
                    emptyPlaceholder='Pengajuan Anggaran tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.target_penerima.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.target_penerima.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          getFieldsMetaDataPPh23.target_penerima.placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Wajib Pajak Orang Pribadi'>
                      Wajib Pajak Orang Pribadi
                    </SelectItem>
                    <SelectItem value='Wajib Pajak Badan Usaha'>
                      Wajib Pajak Badan Usaha
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.nama_penerima.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.nama_penerima.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsNamaPenerima()}
                    value={field.value ?? ''}
                    onChange={(value) => {
                      field.onChange(value || '');

                      const targetPenerima = form.watch('target_penerima');
                      const selectedOption =
                        targetPenerima === 'Wajib Pajak Orang Pribadi'
                          ? optionsWajibPajakOrangPribadi.find(
                              (option) => option.value === value
                            )
                          : optionsWajibPajakBadanUsaha.find(
                              (option) => option.value === value
                            );

                      if (selectedOption) {
                        form.setValue(
                          getFieldsMetaDataPPh23.npwp.id,
                          selectedOption.npwp ?? ''
                        );
                        form.setValue(
                          getFieldsMetaDataPPh23.nama_bank.id,
                          selectedOption.nama_bank ?? ''
                        );
                        form.setValue(
                          getFieldsMetaDataPPh23.no_rekening.id,
                          selectedOption.no_rekening ?? ''
                        );
                        form.setValue(
                          getFieldsMetaDataPPh23.nama_rekening.id,
                          selectedOption.nama_rekening ?? ''
                        );
                      } else {
                        form.setValue(getFieldsMetaDataPPh23.npwp.id, '');
                        form.setValue(getFieldsMetaDataPPh23.nama_bank.id, '');
                        form.setValue(
                          getFieldsMetaDataPPh23.no_rekening.id,
                          ''
                        );
                        form.setValue(
                          getFieldsMetaDataPPh23.nama_rekening.id,
                          ''
                        );
                      }
                    }}
                    placeholder='Pilih Nama Penerima'
                    inputPlaceholder='Cari Nama Penerima'
                    emptyPlaceholder='Nama Penerima tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.npwp.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getFieldsMetaDataPPh23.npwp.label}</FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.nama_bank.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh23.nama_bank.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.no_rekening.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh23.no_rekening.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.nama_rekening.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh23.nama_rekening.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='kode_objek_pajak'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.kode_objek_pajak.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsObjekPajakPPh23}
                    value={field.value || ''}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue);

                      const selectedObjekPajak = optionsObjekPajakPPh23.find(
                        (option) => option.value === selectedValue
                      );

                      const selectedWajibPajakBadanUsaha =
                        optionsWajibPajakBadanUsaha.find(
                          (option) =>
                            option.value ===
                            form.watch(getFieldsMetaDataPPh23.nama_penerima.id)
                        );

                      const npwp = form.watch(getFieldsMetaDataPPh23.npwp.id);

                      if (selectedObjekPajak) {
                        const masaBerlakuBebasPPh23 =
                          selectedWajibPajakBadanUsaha?.masa_berlaku_bebas_pph23;
                        const today = format(
                          new Date().toISOString(),
                          'dd MMMM yyyy HH:mm:ss',
                          {
                            locale: id,
                          }
                        );

                        if (
                          masaBerlakuBebasPPh23 &&
                          isAfter(new Date(masaBerlakuBebasPPh23), today)
                        ) {
                          form.setValue('tarif_pajak', 0);
                        } else {
                          const tarif = npwp
                            ? selectedObjekPajak.tarif_npwp
                            : selectedObjekPajak.tarif_non_npwp;

                          form.setValue('tarif_pajak', tarif || 0);
                        }
                      } else {
                        form.setValue('tarif_pajak', 0);
                      }
                    }}
                    placeholder='Pilih Objek Pajak'
                    inputPlaceholder='Cari Objek Pajak'
                    emptyPlaceholder='Objek Pajak tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.penghasilan_bruto.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.penghasilan_bruto.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <Input
                    {...field}
                    value={value}
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={(e) => {
                      const numericValue = onChange(e);
                      field.onChange(numericValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.tarif_pajak.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh23.tarif_pajak.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={field.value ? `${field.value}%` : `${0}%`}
                      className='bg-slate-100'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.potongan_pajak.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh23.potongan_pajak.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={formatCurrency(field.value as number)}
                      className='bg-slate-100'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh23.penghasilan_diterima.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh23.penghasilan_diterima.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={formatCurrency(field.value as number)}
                      className='bg-slate-100'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.pic_pencairan_penghasilan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.pic_pencairan_penghasilan.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          getFieldsMetaDataPPh23.pic_pencairan_penghasilan
                            .placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='DPK-Direktorat Perencanaan dan Keuangan'>
                      DPK-Direktorat Perencanaan dan Keuangan
                    </SelectItem>
                    <SelectItem value={nama_satker}>{nama_satker}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.invoice.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldsMetaDataPPh23.invoice.label}</FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormDescription>
                  {getFieldsMetaDataPPh23.invoice.subLabel}
                </FormDescription>

                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    onChange={(e) => {
                      // invoiceUpload.handleFileChange(e);
                      field.onChange(e.target.files?.[0]?.name || '');
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.faktur_pajak.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.faktur_pajak.label}
                </FormLabel>
                <FormDescription>
                  {getFieldsMetaDataPPh23.faktur_pajak.subLabel}
                </FormDescription>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    onChange={(e) => {
                      // fakturPajakUpload.handleFileChange(e);
                      field.onChange(e.target.files?.[0]?.name || '');
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh23.dokumen_kerjasama_kegiatan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh23.dokumen_kerjasama_kegiatan.label}
                </FormLabel>
                <FormDescription>
                  {getFieldsMetaDataPPh23.dokumen_kerjasama_kegiatan.subLabel}
                </FormDescription>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    onChange={(e) => {
                      // dokumenKerjasamaUpload.handleFileChange(e);
                      field.onChange(e.target.files?.[0]?.name || '');
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex gap-5 justify-end pt-2 text-white'>
            <Link to='/pph-21/data-pph-21-kegiatan'>
              <Button type='submit' size='sm' className='lg:mt-0'>
                <Icons.left className='size-4 mr-2' />
                Kembali
              </Button>
            </Link>

            <Button variant='brand' type='submit' size='sm' className='lg:mt-0'>
              <Icons.save className='size-4 mr-2' />
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
