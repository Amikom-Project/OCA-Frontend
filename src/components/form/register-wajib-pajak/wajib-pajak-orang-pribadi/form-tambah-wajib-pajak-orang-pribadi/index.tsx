import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { ListStatusPegawai } from '@/api/status-pegawai-api';
import { ListPTKP } from '@/api/ptkp-api';

import { useAuth } from '@/hooks/use-auth';
// import { useFileUpload } from '@/hooks/use-file-upload';
import { useFetchOptionsProvinsi } from '@/hooks/use-option-provinsi';
import { useFetchOptionsBank } from '@/hooks/use-option-bank';
import { useFetchOptionsKabupaten } from '@/hooks/use-option-kabupaten';
import { useFetchOptionsNegara } from '@/hooks/use-option-negara';

import { TStatusPegawaiModel } from '@/types/status-pegawai-type';
import { TPtkpModel } from '@/types/ptkp-type';
import { TWajibPajakOrangPribadiFormSchema } from '@/types/wajib-pajak-orang-pribadi-type';
import { WajibPajakOrangPribadiValidation } from '@/validations/wajib-pajak-orang-pribadi-schema-validation';
import { getFieldsMetaDataWajibPajaOrangPribadi } from '@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi/form-fields';

import { Create } from '@/api/wajib-pajak-orang-pribadi-api';

import { toast } from 'sonner';
import { SelectBox } from '@/components/ui/selectbox';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function FormTambahWajibPajakOrangPribadi() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const { handleFileChange, base64File } = useFileUpload();

  const token = user.access_token;
  const [provinsi, setProvinsi] = useState<string>('');

  const [ptkpOptions, setPtkpOptions] = useState<TPtkpModel[]>([]);
  const [statusOptions, setStatusOptions] = useState<TStatusPegawaiModel[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const nama_provinsi = provinsi;

  const { optionsProvinsi } = useFetchOptionsProvinsi(token);
  const { optionsKabupaten } = useFetchOptionsKabupaten(token, nama_provinsi);
  const { optionsBank } = useFetchOptionsBank(token);
  const { optionsNegara } = useFetchOptionsNegara(token);

  useEffect(() => {
    const fetchStatusPegawai = async () => {
      try {
        const options = await ListStatusPegawai(token);
        setStatusOptions(options.result);
      } catch (error) {
        console.error('Failed to fetch status pegawai:', error);
      }
    };

    const fetchPtkp = async () => {
      try {
        const options = await ListPTKP(token);
        setPtkpOptions(options.result);
      } catch (error) {
        console.error('Failed to fetch status pegawai:', error);
      }
    };

    fetchStatusPegawai();
    fetchPtkp();
  }, [token]);

  const form = useForm<TWajibPajakOrangPribadiFormSchema>({
    resolver: zodResolver(WajibPajakOrangPribadiValidation),
    defaultValues: {
      nama: '',
      email: '',
      nip: '',
      nik: '',
      nama_ktp: '',
      no_passport: '',
      nama_passport: '',
      masa_berlaku_passport: undefined,
      no_rekening: '',
      nama_rekening: '',
      ada_npwp: 'Tidak',
      npwp: '',
      nama_npwp: '',
    },
  });

  const onSubmit = async (data: TWajibPajakOrangPribadiFormSchema) => {
    const formData = {
      ...data,
      // file_foto_ktp: base64File || '',
      // file_foto_passport: base64File || '',
      // file_foto_bukti_rekening: base64File || '',
      // file_foto_npwp: base64File || '',
    };
    const response = await Create(formData, token);

    if (response.status.code === 201) {
      toast.success(response.status.description);
      navigate('/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajaOrangPribadi.nama.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajaOrangPribadi.nama.label}
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
            name={getFieldsMetaDataWajibPajaOrangPribadi.email.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajaOrangPribadi.email.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <FormControl>
                  <Input {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajaOrangPribadi.status_pegawai.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajaOrangPribadi.status_pegawai.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          getFieldsMetaDataWajibPajaOrangPribadi.status_pegawai
                            .placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem
                        key={option.kode_status_pegawai}
                        value={option.status_pegawai}
                      >
                        {option.status_pegawai}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {['Pegawai Tetap', 'Dewan Komisaris', 'Mantan Pegawai'].includes(
            form.watch('status_pegawai')
          ) && (
            <FormField
              control={form.control}
              name={getFieldsMetaDataWajibPajaOrangPribadi.nip.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getFieldsMetaDataWajibPajaOrangPribadi.nip.label}
                  </FormLabel>
                  <span className='text-red-500 p-1'>*</span>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajaOrangPribadi.ptkp.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajaOrangPribadi.ptkp.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          getFieldsMetaDataWajibPajaOrangPribadi.ptkp
                            .placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ptkpOptions.map((option) => (
                      <SelectItem key={option.kode_ptkp} value={option.ptkp}>
                        {option.ptkp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={getFieldsMetaDataWajibPajaOrangPribadi.kewarganegaraan.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getFieldsMetaDataWajibPajaOrangPribadi.kewarganegaraan.label}
                </FormLabel>
                <span className='text-red-500 p-1'>*</span>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          getFieldsMetaDataWajibPajaOrangPribadi.kewarganegaraan
                            .placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='WNI'>WNI</SelectItem>
                    <SelectItem value='WNA'>WNA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('kewarganegaraan') === 'WNI' && (
            <>
              <FormField
                control={form.control}
                name={getFieldsMetaDataWajibPajaOrangPribadi.nik.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.nik.label}
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormDescription>
                      {getFieldsMetaDataWajibPajaOrangPribadi.nik.subLabel}
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        size={16}
                        maxLength={16}
                        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\D/g,
                            ''
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_ktp.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.nama_ktp.label}
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.file_foto_ktp.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi.file_foto_ktp
                          .label
                      }
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormDescription>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi.file_foto_ktp
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_bank.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.nama_bank.label}
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormControl>
                      <SelectBox
                        options={optionsBank}
                        value={field.value || ''}
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.no_rekening.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.no_rekening.label}
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_rekening.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi.nama_rekening
                          .label
                      }
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
                  getFieldsMetaDataWajibPajaOrangPribadi
                    .file_foto_bukti_rekening.id
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi
                          .file_foto_bukti_rekening.label
                      }
                    </FormLabel>
                    <FormDescription>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.ada_npwp.id}
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.ada_npwp.label}
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

              {form.watch('ada_npwp') === 'Ya' && (
                <>
                  <FormField
                    control={form.control}
                    name={getFieldsMetaDataWajibPajaOrangPribadi.npwp.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {getFieldsMetaDataWajibPajaOrangPribadi.npwp.label}
                        </FormLabel>
                        {form.watch('ada_npwp') === 'Ya' && (
                          <span className='text-red-500 p-1'>*</span>
                        )}
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={getFieldsMetaDataWajibPajaOrangPribadi.nama_npwp.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {
                            getFieldsMetaDataWajibPajaOrangPribadi.nama_npwp
                              .label
                          }
                        </FormLabel>
                        {form.watch('ada_npwp') === 'Ya' && (
                          <span className='text-red-500 p-1'>*</span>
                        )}
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={
                      getFieldsMetaDataWajibPajaOrangPribadi.provinsi_npwp.id
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {
                            getFieldsMetaDataWajibPajaOrangPribadi.provinsi_npwp
                              .label
                          }
                        </FormLabel>
                        {form.watch('ada_npwp') === 'Ya' && (
                          <span className='text-red-500 p-1'>*</span>
                        )}
                        <FormControl>
                          <SelectBox
                            options={optionsProvinsi}
                            value={field.value || ''}
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
                    name={
                      getFieldsMetaDataWajibPajaOrangPribadi.kabupaten_npwp.id
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {
                            getFieldsMetaDataWajibPajaOrangPribadi
                              .kabupaten_npwp.label
                          }
                        </FormLabel>
                        {form.watch('ada_npwp') === 'Ya' && (
                          <span className='text-red-500 p-1'>*</span>
                        )}
                        <FormControl>
                          <SelectBox
                            options={optionsKabupaten}
                            value={field.value || ''}
                            onChange={field.onChange}
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
                    name={
                      getFieldsMetaDataWajibPajaOrangPribadi.file_foto_npwp.id
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {
                            getFieldsMetaDataWajibPajaOrangPribadi
                              .file_foto_npwp.label
                          }
                        </FormLabel>
                        {form.watch('ada_npwp') === 'Ya' && (
                          <span className='text-red-500 p-1'>*</span>
                        )}
                        <FormDescription>
                          {
                            getFieldsMetaDataWajibPajaOrangPribadi
                              .file_foto_npwp.subLabel
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
                      </FormItem>
                    )}
                  />
                </>
              )}
            </>
          )}

          {form.watch('kewarganegaraan') === 'WNA' && (
            <>
              <FormField
                control={form.control}
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_negara.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.nama_negara.label}
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormControl>
                      <SelectBox
                        options={optionsNegara}
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder='Pilih Nama Negara'
                        inputPlaceholder='Cari Nama Negara'
                        emptyPlaceholder='Nama Negara tidak tersedia.'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={getFieldsMetaDataWajibPajaOrangPribadi.no_passport.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.no_passport.label}
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormDescription>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi.no_passport
                          .subLabel
                      }
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_passport.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi.nama_passport
                          .label
                      }
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
                name={
                  getFieldsMetaDataWajibPajaOrangPribadi.masa_berlaku_passport
                    .id
                }
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <div className='flex items-center'>
                      <FormLabel>
                        {
                          getFieldsMetaDataWajibPajaOrangPribadi
                            .masa_berlaku_passport.label
                        }
                      </FormLabel>
                      <span className='text-red-500 p-1'>*</span>
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
                              <span>Pilih Tanggal Masa Berlaku Passport</span>
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
                  getFieldsMetaDataWajibPajaOrangPribadi.file_foto_passport.id
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi
                          .file_foto_passport.label
                      }
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormDescription>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi
                          .file_foto_passport.subLabel
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_bank.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.nama_bank.label}
                    </FormLabel>
                    <span className='text-red-500 p-1'>*</span>
                    <FormControl>
                      <SelectBox
                        options={optionsBank}
                        value={field.value || ''}
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.no_rekening.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {getFieldsMetaDataWajibPajaOrangPribadi.no_rekening.label}
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
                name={getFieldsMetaDataWajibPajaOrangPribadi.nama_rekening.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi.nama_rekening
                          .label
                      }
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
                  getFieldsMetaDataWajibPajaOrangPribadi
                    .file_foto_bukti_rekening.id
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi
                          .file_foto_bukti_rekening.label
                      }
                    </FormLabel>
                    <FormDescription>
                      {
                        getFieldsMetaDataWajibPajaOrangPribadi
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
            </>
          )}

          <div className='flex gap-5 justify-end pt-2 text-white'>
            <Link to='/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi'>
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
