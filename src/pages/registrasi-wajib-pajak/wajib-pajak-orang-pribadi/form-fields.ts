import { TWajibPajakOrangPribadiFormSchema } from '@/types/wajib-pajak-orang-pribadi-type';

export const getFieldsMetaDataWajibPajaOrangPribadi: {
  [K in keyof TWajibPajakOrangPribadiFormSchema]: {
    id: K;
    label: string;
    subLabel?: string | null;
    placeholder?: string | null;
  };
} = {
  nama: {
    id: 'nama',
    label: 'Nama Lengkap',
  },
  email: {
    id: 'email',
    label: 'Email',
  },
  status_pegawai: {
    id: 'status_pegawai',
    label: 'Status Pegawai',
    placeholder: 'Pilih Status Pegawai',
  },
  nip: {
    id: 'nip',
    label: 'NIP',
  },
  ptkp: {
    id: 'ptkp',
    label: 'PTKP',
    placeholder: 'Pilih PTKP',
  },
  kewarganegaraan: {
    id: 'kewarganegaraan',
    label: 'Kewarganegaraan',
    placeholder: 'Pilih Kewarganegaraan',
  },
  nama_negara: {
    id: 'nama_negara',
    label: 'Nama Negara',
    placeholder: 'Pilih Nama Negara',
  },
  nik: {
    id: 'nik',
    label: 'NIK',
    subLabel: 'Isikan 16 digit angka NIK sesuai dengan yang ada di KTP.',
  },
  nama_ktp: {
    id: 'nama_ktp',
    label: 'Nama KTP',
  },
  file_foto_ktp: {
    id: 'file_foto_ktp',
    label: 'Upload Foto KTP',
    subLabel: 'Format File adalah PNG, JPG, JPEG dan ukuran max file 5 mb.',
  },
  nama_bank: {
    id: 'nama_bank',
    label: 'Nama Bank',
  },
  no_rekening: {
    id: 'no_rekening',
    label: 'No Rekening',
  },
  nama_rekening: {
    id: 'nama_rekening',
    label: 'Nama Rekening',
  },
  file_foto_bukti_rekening: {
    id: 'file_foto_bukti_rekening',
    label: 'Upload Foto Rekening',
    subLabel: 'Format File adalah PNG, JPG, JPEG dan ukuran max file 5 mb.',
  },
  ada_npwp: {
    id: 'ada_npwp',
    label: 'Ada NPWP ?',
  },
  npwp: {
    id: 'npwp',
    label: 'NPWP',
  },
  nama_npwp: {
    id: 'nama_npwp',
    label: 'Nama NPWP',
  },
  provinsi_npwp: {
    id: 'provinsi_npwp',
    label: 'Provinsi NPWP',
  },
  kabupaten_npwp: {
    id: 'kabupaten_npwp',
    label: 'Kabupaten NPWP',
  },
  file_foto_npwp: {
    id: 'file_foto_npwp',
    label: 'Upload Foto NPWP',
    subLabel: 'Format File adalah PNG, JPG, JPEG dan ukuran max file 5 mb.',
  },
  no_passport: {
    id: 'no_passport',
    label: 'No Passport',
    subLabel: 'Isikan no passport sesuai dengan yang ada di passport.',
  },
  nama_passport: {
    id: 'nama_passport',
    label: 'Nama Passport',
  },
  masa_berlaku_passport: {
    id: 'masa_berlaku_passport',
    label: 'Masa Berlaku Passport',
  },
  file_foto_passport: {
    id: 'file_foto_passport',
    label: 'Upload Foto Passport',
    subLabel: 'Format File adalah PNG, JPG, JPEG dan ukuran max file 5 mb.',
  },
};
