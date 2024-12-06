import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useCurrencyInput from '@/hooks/use-currency-input';
import { TPPh21PenerimaFormSchema } from '@/types/pph-21-penerima-type';
import { PPh21PenerimaValidation } from '@/validations/pph-21-penerima-schema-validation';
import { getFieldsMetaDataPPh21Penerima } from '@/pages/pph-21/pph-21-penerima/form-fields';

import { SelectBox } from '@/components/ui/selectbox';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function FormEditPPh21Penerima() {
  const { value, onChange } = useCurrencyInput(0);

  const options = [{ value: 'IND', label: 'Wakhid' }];
  const optionsObjek = [{ value: 'IND', label: 'Upah PTT atau Pegawai Lepas' }];

  const form = useForm<TPPh21PenerimaFormSchema>({
    resolver: zodResolver(PPh21PenerimaValidation),
  });

  const onSubmit = async (data: TPPh21PenerimaFormSchema) => {
    console.log('data submitted', data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh21Penerima.nama.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Penerima.nama.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={options}
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder='Pilih Nama Penerima'
                    inputPlaceholder='Cari Nama Penerima'
                    emptyPlaceholder='Nama Penerima tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.status_pegawai.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.status_pegawai.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.nik.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.nik.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.npwp.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.npwp.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.nama_bank.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.nama_bank.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.no_rekening.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.no_rekening.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.nama_rekening.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.nama_rekening.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.penghasilan_bulanan.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.penghasilan_bulanan.label}
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
            name={getFieldsMetaDataPPh21Penerima.metode_potong.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Penerima.metode_potong.label}
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
                          getFieldsMetaDataPPh21Penerima.metode_potong
                            .placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='m@example.com'>PPT/BP</SelectItem>
                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh21Penerima.kode_objek_pajak.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Penerima.kode_objek_pajak.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsObjek}
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
            name={getFieldsMetaDataPPh21Penerima.penghasilan_bruto.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Penerima.penghasilan_bruto.label}
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
              name={getFieldsMetaDataPPh21Penerima.tarif_berlaku.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.tarif_berlaku.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.potongan_pajak.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.potongan_pajak.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={getFieldsMetaDataPPh21Penerima.penghasilan_diterima.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataPPh21Penerima.penghasilan_diterima.label}
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} className='bg-slate-100 ' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-5 justify-end pt-2 text-white'>
            <Link to='/pph-21/data-pph-21-kegiatan/data-pph-21-penerima'>
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
