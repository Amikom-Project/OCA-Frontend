import { TWajibPajakBadanUsahaFormSchema } from '@/types/wajib-pajak-badan-usaha-type';

export const getFieldsMetaDataWajibPajakBadanUsaha: {
  [K in keyof TWajibPajakBadanUsahaFormSchema]: {
    id: K;
    label: string;
    subLabel?: string | null;
    placeholder?: string | null;
  };
} = {
  nama_badan_usaha: {
    id: 'nama_badan_usaha',
    label: 'Nama Badan Usaha',
  },
  email: {
    id: 'email',
    label: 'Email',
  },
  file_foto_identitas_badan: {
    id: 'file_foto_identitas_badan',
    label: 'Upload Foto Identitas Badan Usaha',
    subLabel: 'Format File adalah PNG, JPG, JPEG dan ukuran max file 5 mb.',
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
    label: 'Upload Foto Bukti Rekening',
    subLabel: 'Format File adalah PNG, JPG, JPEG dan ukuran max file 5 mb.',
  },
  nama_narahubung: {
    id: 'nama_narahubung',
    label: 'Nama Narahubung',
  },
  kontak_narahubung: {
    id: 'kontak_narahubung',
    label: 'Kontak Narahubung',
  },
  ada_skb_pph23: {
    id: 'ada_skb_pph23',
    label: 'Ada SKBPPh23 (Surat Keterangan Bebas PPh 23) ?',
  },
  masa_berlaku_bebas_pph23: {
    id: 'masa_berlaku_bebas_pph23',
    label: 'Masa Berlaku Bebas PPh 23',
    placeholder: 'Pilih Tanggal Masa Berlaku Bebas PPh 23',
  },
  file_surat_bebas_pph23: {
    id: 'file_surat_bebas_pph23',
    label: 'Upload Foto Surat Bebas PPh 23',
    subLabel: 'Format FIle adalah PDF dan ukuran max file adalah 5 mb.',
  },
  status_pkp: {
    id: 'status_pkp',
    label: 'Status PKP (Pengusaha Kena Pajak)',
  },
};
