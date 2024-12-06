import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/use-auth';
import { useFetchOptionsJenisPenghasilanPPh21 } from '@/hooks/use-option-jenis-penghasilan';
import { useFetchOptionsPengajuanAnggaran } from '@/hooks/use-option-pengajuan-anggaran';

import { Create } from '@/api/pph-21-kegiatan-api';

import { TPPh21KegiatanFormSchema } from '@/types/pph-21-kegiatan-type';
import { PPh21KegiatanValidation } from '@/validations/pph-21-kegiatan-schema-validation';
import { getFieldsMetaDataPPh21Kegiatan } from '@/pages/pph-21/pph-21-kegiatan/form-fields';

import { toast } from 'sonner';
import { SelectBox } from '@/components/ui/selectbox';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

export default function FormTambahPPh21Kegiatan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user.access_token;
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;
  const nama_satker = Array.isArray(user.nama_satker)
    ? user.nama_satker.join(', ')
    : user.nama_satker;

  const { optionsJenisPenghasilan } =
    useFetchOptionsJenisPenghasilanPPh21(token);
  const { optionsPengajuanAnggaran } = useFetchOptionsPengajuanAnggaran(
    idl,
    token
  );

  const form = useForm<TPPh21KegiatanFormSchema>({
    resolver: zodResolver(PPh21KegiatanValidation),
    defaultValues: {
      uraian_kegiatan: '',
      minta_billing_sendiri: 'Tidak',
    },
  });

  const onSubmit = async (data: TPPh21KegiatanFormSchema) => {
    const formData = { ...data, idl };
    const response = await Create(formData, token);

    if (response.status.code === 201) {
      toast.success(response.status.description);
      navigate('/pph-21/data-pph-21-kegiatan');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name={getFieldsMetaDataPPh21Kegiatan.jenis_penghasilan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Kegiatan.jenis_penghasilan.label}
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
            name={getFieldsMetaDataPPh21Kegiatan.uraian_kegiatan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Kegiatan.uraian_kegiatan.label}
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
            name={getFieldsMetaDataPPh21Kegiatan.no_pengajuan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataPPh21Kegiatan.no_pengajuan.label}
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
            name={getFieldsMetaDataPPh21Kegiatan.pic_pencairan_penghasilan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    getFieldsMetaDataPPh21Kegiatan.pic_pencairan_penghasilan
                      .label
                  }
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
                          getFieldsMetaDataPPh21Kegiatan
                            .pic_pencairan_penghasilan.placeholder
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
            name={getFieldsMetaDataPPh21Kegiatan.minta_billing_sendiri.id}
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>
                  {getFieldsMetaDataPPh21Kegiatan.minta_billing_sendiri.label}
                  <span className='text-red-500 p-1'>*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-row space-x-4'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Ya' />
                      </FormControl>
                      <FormLabel className='font-normal'>Ya</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Tidak' />
                      </FormControl>
                      <FormLabel className='font-normal'>Tidak</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
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
