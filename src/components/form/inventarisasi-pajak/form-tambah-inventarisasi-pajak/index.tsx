import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/use-auth';
import { useFetchOptionsPengajuanAnggaran } from '@/hooks/use-option-pengajuan-anggaran';
import {
  useFetchOptionsObjekPajakPPh23,
  useFetchOptionsObjekPajakPPh4Ayat2,
  useFetchOptionsObjekPajakPPN,
} from '@/hooks/use-option-objek-pajak';
import useCurrencyInput from '@/hooks/use-currency-input';
// import { useFileUpload } from '@/hooks/use-file-upload';

import { TInventarisasiPajakFormSchema } from '@/types/inventarisasi-pajak-type';
import { InventarisasiPajakValidation } from '@/validations/inventarisasi-pajak-schema-validation';
import { getFieldsMetaDataInventarisasiPajak } from '@/pages/inventarisasi-pajak/form-fields';

import { Create } from '@/api/inventarisasi-pajak-api';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { SelectBox } from '@/components/ui/selectbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FormTambahInventarisasiPajak() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const token = user.access_token;
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;

  // const { handleFileChange, base64File } = useFileUpload();

  const nominalDPPInput = useCurrencyInput(0);
  const nominalPajakInput = useCurrencyInput(0);

  const { optionsPengajuanAnggaran } = useFetchOptionsPengajuanAnggaran(
    idl,
    token
  );

  const { optionsObjekPajakPPh23 } = useFetchOptionsObjekPajakPPh23(token);
  const { optionsObjekPajakPPh4Ayat2 } =
    useFetchOptionsObjekPajakPPh4Ayat2(token);
  const { optionsObjekPajakPPN } = useFetchOptionsObjekPajakPPN(token);

  const form = useForm<TInventarisasiPajakFormSchema>({
    resolver: zodResolver(InventarisasiPajakValidation),
    defaultValues: {
      uraian_kegiatan: '',
      nama_pemotong: '',
      npwp_pemotong: '',
    },
  });

  const optionsObjekPajak = () => {
    const jenisPajak = form.watch('jenis_pajak');
    if (jenisPajak === 'PPh 23') {
      return Array.isArray(optionsObjekPajakPPh23)
        ? optionsObjekPajakPPh23
        : [];
    }
    if (jenisPajak === 'PPh 4 Ayat 2') {
      return Array.isArray(optionsObjekPajakPPh4Ayat2)
        ? optionsObjekPajakPPh4Ayat2
        : [];
    }
    if (jenisPajak === 'PPN') {
      return Array.isArray(optionsObjekPajakPPN) ? optionsObjekPajakPPN : [];
    }
    return [];
  };

  const onSubmit = async (data: TInventarisasiPajakFormSchema) => {
    // const formData = { ...data, idl, file_bukti: base64File || '' };
    const formData = { ...data, idl };
    const response = await Create(formData, token);

    if (response.status.code === 201) {
      toast.success(response.status.description);
      navigate('/inventarisasi-pajak/data-inventarisasi-pajak');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name={getFieldsMetaDataInventarisasiPajak.uraian_kegiatan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.uraian_kegiatan.label}
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
            name={getFieldsMetaDataInventarisasiPajak.no_pengajuan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.no_pengajuan.label}
                </FormLabel>
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataInventarisasiPajak.nominal_dpp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.nominal_dpp.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <Input
                    {...field}
                    value={nominalDPPInput.value}
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={(e) => {
                      const numericValue = nominalDPPInput.onChange(e);
                      field.onChange(numericValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={getFieldsMetaDataInventarisasiPajak.jenis_pajak.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.jenis_pajak.label}
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
                          getFieldsMetaDataInventarisasiPajak.jenis_pajak
                            .placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='PPh 23'>PPh 23</SelectItem>
                    <SelectItem value='PPh 4 Ayat 2'>PPh 4 Ayat 2</SelectItem>
                    <SelectItem value='PPN'>PPN</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataInventarisasiPajak.kode_objek_pajak.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.kode_objek_pajak.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsObjekPajak()}
                    value={field.value || ''}
                    onChange={field.onChange}
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
            name={getFieldsMetaDataInventarisasiPajak.nominal_pajak.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.nominal_pajak.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <Input
                    {...field}
                    value={nominalPajakInput.value}
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={(e) => {
                      const numericValue = nominalPajakInput.onChange(e);
                      field.onChange(numericValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataInventarisasiPajak.nama_pemotong.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.nama_pemotong.label}
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
            name={getFieldsMetaDataInventarisasiPajak.npwp_pemotong.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.npwp_pemotong.label}
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
            name={getFieldsMetaDataInventarisasiPajak.file_bukti.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataInventarisasiPajak.file_bukti.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormDescription>
                  {getFieldsMetaDataInventarisasiPajak.file_bukti.subLabel}
                </FormDescription>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    onChange={(e) => {
                      // handleFileChange(e);
                      field.onChange(e.target.files?.[0]?.name || '');
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-5 justify-end pt-2 text-white'>
            <Link to='/inventarisasi-pajak/data-inventarisasi-pajak'>
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
