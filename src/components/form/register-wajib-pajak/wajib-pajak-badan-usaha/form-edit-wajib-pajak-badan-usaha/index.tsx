import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import {
  TWajibPajakBadanUsahaFormSchema,
  TWajibPajakBadanUsahaModel,
} from '@/types/wajib-pajak-badan-usaha-type';
import { WajibPajakBadanUsahaValidation } from '@/validations/wajib-pajak-badan-usaha-schema-validation';
import { getFieldsMetaDataWajibPajakBadanUsaha } from '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/form-fields';

import { SelectBox } from '@/components/ui/selectbox';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/hooks/use-auth';
import { useFetchOptionsProvinsi } from '@/hooks/use-option-provinsi';
import { useFetchOptionsKabupaten } from '@/hooks/use-option-kabupaten';
import { useFetchOptionsBank } from '@/hooks/use-option-bank';
import { toast } from 'sonner';
import { Update } from '@/api/wajib-pajak-badan-usaha-api';

type FormEditWajibPajakBadanUsahaProps = {
  initialData?: TWajibPajakBadanUsahaModel | null;
};

export default function FormEditWajibPajakBadanUsaha({
  initialData,
}: FormEditWajibPajakBadanUsahaProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [provinsi, setProvinsi] = useState<string>(
    initialData?.provinsi_npwp || ''
  );

  const kode_wajib_pajak_badan_usaha =
    initialData?.kode_wajib_pajak_badan_usaha;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const token = user.access_token;

  const nama_provinsi = provinsi;

  const { optionsProvinsi } = useFetchOptionsProvinsi(token);
  const { optionsKabupaten } = useFetchOptionsKabupaten(token, nama_provinsi);
  const { optionsBank } = useFetchOptionsBank(token);

  const form = useForm<TWajibPajakBadanUsahaFormSchema>({
    resolver: zodResolver(WajibPajakBadanUsahaValidation),
    defaultValues: {
      nama_badan_usaha: initialData?.nama_badan_usaha || '',
      email: initialData?.email || '',
      file_foto_identitas_badan: '',
      npwp: initialData?.npwp || '',
      nama_npwp: initialData?.nama_npwp || '',
      provinsi_npwp: initialData?.provinsi_npwp || '',
      kabupaten_npwp: initialData?.kabupaten_npwp || '',
      file_foto_npwp: initialData?.file_foto_npwp || '',
      nama_bank: initialData?.nama_bank || '',
      no_rekening: initialData?.no_rekening || '',
      nama_rekening: initialData?.nama_rekening || '',
      file_foto_bukti_rekening: initialData?.file_foto_bukti_rekening || '',
      nama_narahubung: initialData?.nama_narahubung || '',
      kontak_narahubung: initialData?.kontak_narahubung || '',
      ada_skb_pph23: initialData?.ada_skb_pph23 || 'Tidak',
      masa_berlaku_bebas_pph23: initialData?.masa_berlaku_bebas_pph23
        ? new Date(initialData.masa_berlaku_bebas_pph23)
        : undefined,
      file_surat_bebas_pph23: '',
      status_pkp: initialData?.status_pkp || 'Tidak',
    },
  });

  const onSubmit = async (data: TWajibPajakBadanUsahaFormSchema) => {
    if (!kode_wajib_pajak_badan_usaha) {
      return;
    }

    const response = await Update(data, kode_wajib_pajak_badan_usaha, token);

    if (response.status.code === 200) {
      toast.success(response.status.description);
      navigate('/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.nama_badan_usaha.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.nama_badan_usaha.label}
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
            name={getFieldsMetaDataWajibPajakBadanUsaha.email.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.email.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={
              getFieldsMetaDataWajibPajakBadanUsaha.file_foto_identitas_badan.id
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    getFieldsMetaDataWajibPajakBadanUsaha
                      .file_foto_identitas_badan.label
                  }
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormDescription>
                  {
                    getFieldsMetaDataWajibPajakBadanUsaha
                      .file_foto_identitas_badan.subLabel
                  }
                </FormDescription>
                <FormControl>
                  <Input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    onChange={(e) => {
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
            name={getFieldsMetaDataWajibPajakBadanUsaha.npwp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.npwp.label}
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
            name={getFieldsMetaDataWajibPajakBadanUsaha.nama_npwp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.nama_npwp.label}
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
            name={getFieldsMetaDataWajibPajakBadanUsaha.provinsi_npwp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.provinsi_npwp.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsProvinsi}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      if (Array.isArray(value)) {
                        setProvinsi(value[0] || '');
                      } else {
                        setProvinsi(value);
                      }
                    }}
                    placeholder='Pilih Provinsi NPWP'
                    inputPlaceholder='Cari Provinsi NPWP'
                    emptyPlaceholder='Provinsi NPWP tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.kabupaten_npwp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.kabupaten_npwp.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsKabupaten}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    placeholder='Pilih Kabupaten NPWP'
                    inputPlaceholder='Cari Kabupaten NPWP'
                    emptyPlaceholder='Kabupaten NPWP tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.file_foto_npwp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.file_foto_npwp.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormDescription>
                  {
                    getFieldsMetaDataWajibPajakBadanUsaha.file_foto_npwp
                      .subLabel
                  }
                </FormDescription>
                <FormControl>
                  <Input
                    type='file'
                    accept='.png, .jpg, .jpeg'
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

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.nama_bank.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.nama_bank.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <SelectBox
                    options={optionsBank}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Pilih Nama Bank'
                    inputPlaceholder='Cari Nama Bank'
                    emptyPlaceholder='Nama Bank tidak tersedia.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.no_rekening.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.no_rekening.label}
                </FormLabel>
                {form.watch('nama_bank') !== 'TUNAI' && (
                  <span className='text-red-500 p-1'>*</span>
                )}
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.nama_rekening.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.nama_rekening.label}
                </FormLabel>
                {form.watch('nama_bank') !== 'TUNAI' && (
                  <span className='text-red-500 p-1'>*</span>
                )}
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={
              getFieldsMetaDataWajibPajakBadanUsaha.file_foto_bukti_rekening.id
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    getFieldsMetaDataWajibPajakBadanUsaha
                      .file_foto_bukti_rekening.label
                  }
                </FormLabel>
                {form.watch('nama_bank') !== 'TUNAI' && (
                  <span className='text-red-500 p-1'>*</span>
                )}
                <FormDescription>
                  {
                    getFieldsMetaDataWajibPajakBadanUsaha
                      .file_foto_bukti_rekening.subLabel
                  }
                </FormDescription>
                <FormControl>
                  <Input
                    type='file'
                    accept='.png, .jpg, .jpeg'
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

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.nama_narahubung.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.nama_narahubung.label}
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
            name={getFieldsMetaDataWajibPajakBadanUsaha.kontak_narahubung.id}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <div className='flex items-center'>
                  <FormLabel className='text-left'>
                    {
                      getFieldsMetaDataWajibPajakBadanUsaha.kontak_narahubung
                        .label
                    }
                  </FormLabel>
                  <span className='text-red-500 p-1'>*</span>
                </div>
                <FormControl className='w-full'>
                  <PhoneInput defaultCountry='ID' international {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.ada_skb_pph23.id}
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.ada_skb_pph23.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className='flex flex-row space-x-4 relative'
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

          {form.watch('ada_skb_pph23') === 'Ya' && (
            <>
              <FormField
                control={form.control}
                name={
                  getFieldsMetaDataWajibPajakBadanUsaha.masa_berlaku_bebas_pph23
                    .id
                }
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <div className='flex items-center'>
                      <FormLabel>
                        {
                          getFieldsMetaDataWajibPajakBadanUsaha
                            .masa_berlaku_bebas_pph23.label
                        }
                      </FormLabel>
                      {form.watch('ada_skb_pph23') === 'Ya' && (
                        <span className='text-red-500 p-1'>*</span>
                      )}
                    </div>

                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'EEEE, dd LLLL y', {
                                locale: id,
                              })
                            ) : (
                              <span>
                                Pilih Tanggal Masa Berlaku Bebas PPh 23
                              </span>
                            )}
                            <Icons.calender className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(e) => {
                            field.onChange(e);
                            setIsCalendarOpen(false);
                          }}
                          captionLayout='dropdown-buttons'
                          fromYear={2020}
                          toYear={2050}
                          locale={id}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={
                  getFieldsMetaDataWajibPajakBadanUsaha.file_surat_bebas_pph23
                    .id
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajakBadanUsaha
                          .file_surat_bebas_pph23.label
                      }
                    </FormLabel>
                    {form.watch('ada_skb_pph23') === 'Ya' && (
                      <span className='text-red-500 p-1'>*</span>
                    )}
                    <FormDescription>
                      {
                        getFieldsMetaDataWajibPajakBadanUsaha
                          .file_surat_bebas_pph23.subLabel
                      }
                    </FormDescription>
                    <FormControl>
                      <Input
                        type='file'
                        accept='.png, .jpg, .jpeg'
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
            </>
          )}

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajakBadanUsaha.status_pkp.id}
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>
                  {getFieldsMetaDataWajibPajakBadanUsaha.status_pkp.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-row space-x-4 relative'
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
            <Link to='/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha'>
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
